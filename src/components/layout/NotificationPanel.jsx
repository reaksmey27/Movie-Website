import React from 'react';
import { BellIcon, TrashIcon } from "@heroicons/react/24/solid";

const NotificationPanel = ({ 
    showNotifPanel, 
    setShowNotifPanel, 
    unreadCount, 
    history, 
    markAllAsRead, 
    clearHistory, 
    getIcon, 
    formatTime, 
    panelRef 
}) => {
    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => {
                    setShowNotifPanel(!showNotifPanel);
                    if (!showNotifPanel) markAllAsRead();
                }}
                className={`relative text-white hover:text-purple-400 transition-all bg-white/10 rounded-full p-2 active:scale-90 ${showNotifPanel ? 'bg-white/20 text-purple-400' : ''}`}
            >
                <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow-lg animate-in zoom-in duration-300">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showNotifPanel && (
                <div className="absolute right-[-80px] sm:right-0 mt-6 w-[280px] sm:w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-black uppercase tracking-tighter text-sm italic">Notifications</h3>
                        <button onClick={clearHistory} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-400" title="Clear All">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                        {history.length === 0 ? (
                            <div className="p-10 text-center">
                                <BellIcon className="h-8 w-8 text-gray-700 mx-auto mb-3 opacity-50" />
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">No new alerts.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {history.map((notif) => (
                                    <div key={notif.id} className="px-6 py-4 hover:bg-white/5 border-b border-white/5 transition-colors flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            {getIcon(notif.type, true)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] sm:text-xs font-bold text-white/90 leading-relaxed mb-1">{notif.message}</p>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{formatTime(notif.timestamp)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationPanel;
