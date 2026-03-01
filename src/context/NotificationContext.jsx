import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('cinema_notifications');
        return saved ? JSON.parse(saved) : [];
    });
    const [unreadCount, setUnreadCount] = useState(0);

    // Persist history and update unread count
    useEffect(() => {
        localStorage.setItem('cinema_notifications', JSON.stringify(history));
        setUnreadCount(history.filter(n => !n.read).length);
    }, [history]);

    const showNotification = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotif = { id, message, type, timestamp: new Date().toISOString(), read: false };

        // Add to active toasts
        setNotifications((prev) => [...prev, { ...newNotif, visible: false }]);

        // Add to persistent history
        setHistory(prev => [newNotif, ...prev].slice(0, 50)); // Keep last 50

        // Trigger entrance animation for toast
        setTimeout(() => {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, visible: true } : n));
        }, 10);

        // Auto remove toast
        setTimeout(() => {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, visible: false } : n));
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }, 500);
        }, 5000);
    }, []);

    const markAllAsRead = () => {
        setHistory(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, visible: false } : n));
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 500);
    };

    const getIcon = (type, small = false) => {
        const size = small ? "h-5 w-5" : "h-6 w-6";
        switch (type) {
            case 'success': return <CheckCircleIcon className={`${size} text-emerald-400`} />;
            case 'error': return <XCircleIcon className={`${size} text-red-400`} />;
            case 'warning': return <ExclamationTriangleIcon className={`${size} text-amber-400`} />;
            default: return <InformationCircleIcon className={`${size} text-blue-400`} />;
        }
    };

    const getStyles = (type) => {
        switch (type) {
            case 'success': return 'bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10';
            case 'error': return 'bg-red-500/10 border-red-500/20 shadow-red-500/10';
            case 'warning': return 'bg-amber-500/10 border-amber-500/20 shadow-amber-500/10';
            default: return 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10';
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification, history, unreadCount, markAllAsRead, clearHistory, getIcon }}>
            {children}

            {/* Toast Portal */}
            <div className="fixed bottom-8 right-8 z-[2000] flex flex-col gap-4 pointer-events-none">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className={`pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] transition-all duration-500 transform ${n.visible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-12"
                            } ${getStyles(n.type)}`}
                    >
                        <div className="flex-shrink-0">
                            {getIcon(n.type)}
                        </div>
                        <p className="flex-1 text-sm font-bold text-white tracking-wide">
                            {n.message}
                        </p>
                        <button
                            onClick={() => removeNotification(n.id)}
                            className="text-gray-500 hover:text-white transition-colors p-1"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
