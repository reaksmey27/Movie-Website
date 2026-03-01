import { useState, useEffect } from "react";
import { tmdbService } from "../../services/tmdbService";

const SERVERS = [
  { name: "Server 1", url: (id) => `https://vidsrc.cc/v2/embed/movie/${id}` },
  { name: "Server 2", url: (id) => `https://vidsrc.xyz/embed/movie/${id}` },
  { name: "Server 3", url: (id) => `https://vidsrc.me/embed/movie?tmdb=${id}` },
];

const useMovieDetail = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Player state
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeServer, setActiveServer] = useState("Server 1");
  const [iframeLoading, setIframeLoading] = useState(false);
  const [playerMessage, setPlayerMessage] = useState("");

  // Fetch movie details
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await tmdbService.getMovieDetails(id);
        if (data) {
          setMovie(tmdbService.formatMovieData(data));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  // Reset iframe loader when server or playing state changes
  useEffect(() => {
    if (!isPlaying) return;
    setIframeLoading(true);
    setPlayerMessage("");
  }, [isPlaying, activeServer, id]);

  // Show timeout message if iframe takes too long
  useEffect(() => {
    if (!isPlaying || !iframeLoading) return;

    const timeoutId = setTimeout(() => {
      setIframeLoading(false);
      setPlayerMessage("This server is taking too long. Please switch server.");
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [isPlaying, iframeLoading]);

  // Derived values
  const activeServerIndex = SERVERS.findIndex((s) => s.name === activeServer);
  const currentServer = SERVERS[activeServerIndex] || SERVERS[0];
  const currentServerUrl = movie ? currentServer.url(movie.id) : "";

  const goToNextServer = () => {
    const nextIndex = (activeServerIndex + 1) % SERVERS.length;
    setActiveServer(SERVERS[nextIndex].name);
  };

  return {
    movie,
    loading,
    SERVERS,
    showTrailer,
    setShowTrailer,
    isPlaying,
    setIsPlaying,
    activeServer,
    setActiveServer,
    iframeLoading,
    setIframeLoading,
    playerMessage,
    currentServerUrl,
    goToNextServer,
  };
};

export default useMovieDetail;
