import { useState, useEffect } from 'react';

export const usePlayer = (id) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeServer, setActiveServer] = useState('Server 1');
    const [iframeLoading, setIframeLoading] = useState(false);
    const [playerMessage, setPlayerMessage] = useState('');

    const SERVERS = [
        { name: 'Server 1', url: (id) => `https://vidsrc.to/embed/movie/${id}` },
        { name: 'Server 2', url: (id) => `https://vidsrc.me/embed/movie/${id}` },
        { name: 'Server 3', url: (id) => `https://embed.su/embed/movie/${id}` },
    ];

    const currentServer = SERVERS.find(s => s.name === activeServer) || SERVERS[0];
    const currentServerUrl = currentServer.url(id);
    const activeServerIndex = SERVERS.findIndex(s => s.name === activeServer);

    useEffect(() => {
        if (!isPlaying) return;
        setIframeLoading(true);
        setPlayerMessage('');
    }, [isPlaying, activeServer, id]);

    useEffect(() => {
        if (!isPlaying || !iframeLoading) return;

        const timeoutId = setTimeout(() => {
            setIframeLoading(false);
            setPlayerMessage('This server is taking too long. Please switch server.');
        }, 12000);

        return () => clearTimeout(timeoutId);
    }, [isPlaying, iframeLoading]);

    const goToNextServer = () => {
        if (!SERVERS.length) return;
        const nextIndex = (activeServerIndex + 1) % SERVERS.length;
        setActiveServer(SERVERS[nextIndex].name);
    };

    return {
        isPlaying,
        setIsPlaying,
        activeServer,
        setActiveServer,
        iframeLoading,
        setIframeLoading,
        playerMessage,
        setPlayerMessage,
        SERVERS,
        currentServerUrl,
        goToNextServer
    };
};
