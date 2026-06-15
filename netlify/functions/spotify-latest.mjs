import { Buffer } from "node:buffer";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";

function json(
  statusCode,
  body,
  cacheControl = "public, max-age=30, s-maxage=30, stale-while-revalidate=60",
) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
    body: JSON.stringify(body),
  };
}

function toBase64(value) {
  return Buffer.from(value).toString("base64");
}

function normalizeTrack(item, options = {}) {
  if (!item) {
    return null;
  }

  const artists = Array.isArray(item.artists)
    ? item.artists.map((artist) => artist.name).join(", ")
    : "";
  const artwork = Array.isArray(item.album?.images)
    ? item.album.images[0]?.url
    : null;

  return {
    title: item.name,
    artists,
    album: item.album?.name ?? "",
    artworkUrl: artwork,
    url: item.external_urls?.spotify ?? "",
    isPlaying: Boolean(options.isPlaying),
    playedAt: options.playedAt ?? null,
  };
}

async function getAccessToken(clientId, clientSecret, refreshToken) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${toBase64(`${clientId}:${clientSecret}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Spotify token refresh failed (${response.status}): ${details}`,
    );
  }

  const payload = await response.json();
  return payload.access_token;
}

async function fetchCurrentlyPlaying(accessToken) {
  const response = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Spotify currently-playing failed (${response.status}): ${details}`,
    );
  }

  const payload = await response.json();
  if (!payload?.item) {
    return null;
  }

  return normalizeTrack(payload.item, {
    isPlaying: payload.is_playing,
    playedAt: payload.timestamp
      ? new Date(payload.timestamp).toISOString()
      : null,
  });
}

async function fetchRecentlyPlayed(accessToken, limit = 1) {
  const safeLimit = Math.min(Math.max(limit, 1), 50);
  const response = await fetch(
    `${RECENTLY_PLAYED_ENDPOINT}?limit=${safeLimit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Spotify recently-played failed (${response.status}): ${details}`,
    );
  }

  const payload = await response.json();
  const items = Array.isArray(payload?.items) ? payload.items : [];

  return items
    .filter((item) => item?.track)
    .map((item) =>
      normalizeTrack(item.track, {
        isPlaying: false,
        playedAt: item.played_at ?? null,
      }),
    );
}

export async function handler(event) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return json(
      503,
      {
        ok: false,
        error: "spotify_not_configured",
      },
      "no-store",
    );
  }

  const requested = Number.parseInt(
    event?.queryStringParameters?.limit ?? "1",
    10,
  );
  const limit = Math.min(Math.max(Number.isNaN(requested) ? 1 : requested, 1), 50);

  try {
    const accessToken = await getAccessToken(
      clientId,
      clientSecret,
      refreshToken,
    );
    const currentTrack = await fetchCurrentlyPlaying(accessToken);

    // Single-track mode keeps the original response shape.
    if (limit <= 1) {
      if (currentTrack) {
        return json(200, { ok: true, track: currentTrack });
      }

      const [recentTrack = null] = await fetchRecentlyPlayed(accessToken, 1);
      return json(200, { ok: true, track: recentTrack });
    }

    // List mode: now-playing pinned on top, then de-duped recent history.
    // Over-fetch so de-duplication still leaves us with `limit` distinct
    // tracks (Spotify's recently-played list frequently repeats a track).
    const recent = await fetchRecentlyPlayed(accessToken, Math.min(limit * 2, 50));
    const seen = new Set();
    const tracks = [];

    const keyFor = (track) => track.url || `${track.title}::${track.artists}`;

    if (currentTrack) {
      tracks.push(currentTrack);
      seen.add(keyFor(currentTrack));
    }

    // Fill up to `limit` total (current track included) so the count is
    // stable whether or not something is currently playing.
    for (const track of recent) {
      if (tracks.length >= limit) break;
      const key = keyFor(track);
      if (seen.has(key)) continue;
      seen.add(key);
      tracks.push(track);
    }

    return json(200, { ok: true, tracks });
  } catch (error) {
    console.error("[spotify-latest]", error);

    return json(
      500,
      {
        ok: false,
        error: "spotify_fetch_failed",
        message: error?.message ?? String(error),
      },
      "no-store",
    );
  }
}
