# Personal blog made with Astro

This is a personal blog built using [Astro](https://astro.build/)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd astro-blog-latest
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

4. **Build for production:**

   ```sh
   npm run build
   ```

5. **Preview the production build:**
   ```sh
   npm run preview
   ```

## Spotify latest track setup

The homepage includes a live Spotify section powered by a Netlify Function at `/.netlify/functions/spotify-latest`.

### Required environment variables

Set these in Netlify (Site configuration → Environment variables):

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

### Spotify app requirements

1. Create a Spotify app in the Spotify Developer Dashboard.
2. Generate a refresh token for your own account with scopes:
   - `user-read-currently-playing`
   - `user-read-recently-played`
3. Add the values to the environment variables above.

When configured, the section shows the currently playing track and falls back to the most recently played track.
