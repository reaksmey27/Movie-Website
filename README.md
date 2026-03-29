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

3. **Configure TMDB API Key (Required):**

   The application requires a valid TMDB API key to fetch movie data.
   - Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Open the `.env` file in the root directory
   - Replace `your_valid_tmdb_api_key_here` with your actual API key:
     ```
     VITE_TMDB_API_KEY=your_actual_api_key_here
     ```

4. Start the development server:
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

## Tech Stack

- React 18
- Vite
- TMDB API
- React Router
- Context API for state management
