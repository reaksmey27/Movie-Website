# Movie Website

A React-based movie website powered by TMDB API.

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file from `.env.example` and fill in the values.

   Required values:
   - `VITE_TMDB_API_KEY`: get your free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - `VITE_FIREBASE_*`: create a Firebase web app and copy its client config from Project Settings

4. **Authorize your app domain in Firebase Authentication:**

   If Google sign-in shows `auth/unauthorized-domain`, add the exact host serving your app in:

   `Firebase Console -> Authentication -> Settings -> Authorized domains`

   Common examples:
   - `localhost`
   - your deployed domain, such as `movie-website.vercel.app`
   - your custom domain, such as `movies.example.com`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting

### "Failed to sync with cinematic database" Error

This error occurs when the TMDB API key is missing or invalid. To fix:

1. Verify your `.env` file contains a valid `VITE_TMDB_API_KEY`
2. Ensure the API key is correct and not expired
3. Restart the development server after updating the `.env` file

### Network Errors

If you encounter network errors:

- Check your internet connection
- Try using a VPN if TMDB is blocked in your region
- Verify that `api.themoviedb.org` is accessible

### Firebase `auth/unauthorized-domain`

This happens when the current hostname is not listed in Firebase Authentication.

To fix:

1. Open Firebase Console
2. Go to `Authentication -> Settings -> Authorized domains`
3. Add the hostname shown in the app error message
4. Save and reload the app

If the project is using the fallback Firebase config instead of your own project, set the `VITE_FIREBASE_*` values in `.env` and restart Vite.

## Tech Stack

- React 18
- Vite
- TMDB API
- React Router
- Context API for state management
