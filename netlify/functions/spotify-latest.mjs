const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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

async function fetchRecentlyPlayed(accessToken) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Spotify recently-played failed (${response.status}): ${details}`,
    );
  }

  const payload = await response.json();
  const latestItem = payload?.items?.[0];

  if (!latestItem?.track) {
    return null;
  }

  return normalizeTrack(latestItem.track, {
    isPlaying: false,
    playedAt: latestItem.played_at ?? null,
  });
}

export async function handler() {
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

  try {
    const accessToken = await getAccessToken(
      clientId,
      clientSecret,
      refreshToken,
    );
    const currentTrack = await fetchCurrentlyPlaying(accessToken);

    if (currentTrack) {
      return json(200, { ok: true, track: currentTrack });
    }

    const recentTrack = await fetchRecentlyPlayed(accessToken);
    return json(200, { ok: true, track: recentTrack });
  } catch (error) {
    console.error(error);

    return json(
      500,
      {
        ok: false,
        error: "spotify_fetch_failed",
      },
      "no-store",
    );
  }
}
