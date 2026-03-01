import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

export const useNavbarLogic = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const { history, unreadCount, markAllAsRead, clearHistory, getIcon } = useNotification();

    const [currentHash, setCurrentHash] = useState(window.location.hash);
    const [showNotifPanel, setShowNotifPanel] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const panelRef = useRef(null);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setShowNotifPanel(false);
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Movies", path: "/movies" },
        { name: "Trending", path: "/trending" },
        { name: "Favorites", path: "/favorites" },
        { name: "Upcoming", path: "/upcoming" },
    ];

    const checkActive = (linkPath) => {
        if (linkPath.includes("#")) {
            const pathPart = linkPath.split("#")[0] || "/";
            const hashPart = "#" + linkPath.split("#")[1];
            return location.pathname === pathPart && currentHash === hashPart;
        }
        if (linkPath === "/") {
            return location.pathname === "/" && !currentHash;
        }
        return location.pathname === linkPath;
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return {
        user,
        logout,
        isAuthenticated,
        history,
        unreadCount,
        markAllAsRead,
        clearHistory,
        getIcon,
        showNotifPanel,
        setShowNotifPanel,
        isMenuOpen,
        setIsMenuOpen,
        panelRef,
        navLinks,
        checkActive,
        formatTime,
        location,
        navigate
    };
};
