# CineMax - Professional Movie Streaming Platform

![CineMax Preview](https://raw.githubusercontent.com/reaksmey27/Movie-Website/develop/public/images/logo.png)

CineMax is a high-performance, modern movie discovery and trailer streaming platform built with **React 19**, **Vite**, and **Tailwind CSS 4**. It features a state-of-the-art UI with feature-based architecture, absolute import pathing, and real-time TMDB API integration.

## 🚀 Features

- **🏠 Dynamic Landing Page**: Featured hero sliders, trending feeds, and categorized movie sections.
- **🎬 Detailed Movie Experience**: Deep-dive movie details with multi-server video player hosting.
- **🔍 Advanced Search & Filter**: Real-time searching with genre-based filtering and seamless pagination.
- **💖 Favorites System**: Add/remove movies from your personal collection (saved locally).
- **🔒 Membership System**: Mock authentication with specific UI for logged-in users and profile management.
- **🔔 Notification Engine**: Real-time feedback for user actions like adding favorites or profile updates.
- **📱 Ultra-Responsive**: Fully optimized for mobile, tablet, and ultra-wide desktop displays.

## 🛠️ Tech Stack

- **Core**: React 19 + Vite
- **Styling**: Tailwind CSS 4 (with @tailwindcss/vite)
- **Routing**: React Router 7
- **Icons**: Heroicons v2
- **State Management**: React Context API
- **API**: The Movie Database (TMDB)

## 🏗️ Architecture & Best Practices

The project follows a **Feature-Based Layered Architecture**, providing high scalability and maintainability:

- **Path Aliases**: Uses `@/` to point to the `src` directory (configured via `jsconfig.json` and `vite.config.js`).
- **Module Barrels**: Implements index-based exports in `components/` and `hooks/` to reduce import complexity.
- **Custom Hooks**: Business logic is strictly separated from UI components using reusable hooks.
- **Context API**: Global state for Authentication, Favorites, and Notifications.

### Directory Structure

```text
src/
├── components/          # Reusable UI building blocks (Home, Layout, Movies, UI)
├── context/             # Global Context providers (Auth, Favorites, Notifications)
├── hooks/               # Custom React hooks (useMovie, usePlayer, etc.)
├── pages/               # Route-level components mapping to URLs
├── services/            # API services (TMDB integration logic)
└── App.jsx              # Main routing and provider setup
```

## ⚙️ Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/reaksmey27/Movie-Website.git
   cd Movie-Website
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📄 License

This project is open-source and available under the MIT License.

---

Built with ❤️ for cinematic experiences.
