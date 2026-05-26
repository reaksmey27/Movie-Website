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
    qualityLabel: "Primary",
    description: "Fastest default source",
    url: (id) =>
      buildUrl(`https://vidsrc.pm/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 2",
    qualityLabel: "Fallback",
    description: "Try this if playback is slow",
    url: (id) =>
      buildUrl(`https://vidsrc.xyz/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 3",
    qualityLabel: "Fallback",
    description: "Useful when other servers fail",
    url: (id) =>
      buildUrl(`https://vidsrc-embed.ru/embed/movie/${id}`, {
        autoplay: "1",
      }),
  },
  {
    name: "Server 4",
    qualityLabel: "Legacy",
    description: "Older source with broad compatibility",
    url: (id) =>
      buildUrl("https://vidsrc.me/embed/movie", {
        tmdb: id,
        autoplay: "1",
      }),
  },
];

const PLAYER_TIMEOUT_MS = 12000;

const useMovieDetail = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeServer, setActiveServer] = useState(SERVERS[0].name);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [playerMessage, setPlayerMessage] = useState("");
  const [playerInstance, setPlayerInstance] = useState(0);

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
    setIsPlaying(false);
    setShowTrailer(false);
    setActiveServer(SERVERS[0].name);
    setIframeLoading(false);
    setPlayerMessage("");
    setPlayerInstance(0);
  }, [id]);

  useEffect(() => {
    if (!isPlaying) {
      setIframeLoading(false);
      return;
    }

    setIframeLoading(true);
    setPlayerMessage("");
  }, [isPlaying, activeServer, id, playerInstance]);

  useEffect(() => {
    if (!isPlaying || !iframeLoading) return;

    const timeoutId = setTimeout(() => {
      setIframeLoading(false);
      setPlayerMessage("This source is taking too long to respond. Try reloading or switch servers.");
    }, PLAYER_TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [isPlaying, iframeLoading]);

  const activeServerIndex = SERVERS.findIndex((s) => s.name === activeServer);
  const currentServer = SERVERS[activeServerIndex] || SERVERS[0];
  const currentServerUrl = movie ? currentServer.url(movie.id) : "";
  const nextServer = SERVERS[(activeServerIndex + 1) % SERVERS.length];

  const goToNextServer = () => {
    setActiveServer(nextServer.name);
  };

  const reloadPlayer = () => {
    setPlayerMessage("");
    setPlayerInstance((value) => value + 1);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleIframeError = () => {
    setIframeLoading(false);
    setPlayerMessage("This source could not be loaded. Switch to another server.");
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
    currentServer,
    iframeLoading,
    playerMessage,
    currentServerUrl,
    playerInstance,
    nextServerName: nextServer.name,
    goToNextServer,
    reloadPlayer,
    handleIframeLoad,
    handleIframeError,
  };
};

export default useMovieDetail;
