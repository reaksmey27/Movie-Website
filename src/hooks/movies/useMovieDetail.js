import { useEffect, useState } from "react";
import { tmdbService } from "../../services/tmdbService";

const buildUrl = (baseUrl, params = {}) => {
  const searchParams = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );

  return searchParams.size ? `${baseUrl}?${searchParams.toString()}` : baseUrl;
};

const SERVERS = [
  {
    name: "Server 1",
    url: (id) =>
      buildUrl(`https://vidsrc.pm/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 2",
    url: (id) =>
      buildUrl(`https://vidsrc.xyz/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 3",
    url: (id) =>
      buildUrl(`https://vidsrc-embed.ru/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 4",
    url: (id) =>
      buildUrl("https://vidsrc.me/embed/movie", {
        tmdb: id,
        autoplay: "1",
      }),
  },
];

const useMovieDetail = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeServer, setActiveServer] = useState(SERVERS[0].name);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [playerMessage, setPlayerMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await tmdbService.getMovieDetails(id);
        if (!ignore && data) {
          setMovie(tmdbService.formatMovieData(data));
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching movie details:", error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchDetails();
    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (!isPlaying) return;
    setIframeLoading(true);
    setPlayerMessage("");
  }, [isPlaying, activeServer, id]);

  useEffect(() => {
    if (!isPlaying || !iframeLoading) return;

    const timeoutId = setTimeout(() => {
      setIframeLoading(false);
      setPlayerMessage("This server is taking too long. Please switch server.");
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [isPlaying, iframeLoading]);

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
