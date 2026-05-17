import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`
                                pointer-events-auto
                                flex items-center gap-4 p-5 border-4 border-primary neo-shadow bg-surface 
                                min-w-[300px] max-w-md
                            `}
                        >
                            <div className={`p-2 border-2 border-primary ${n.type === 'success' ? 'bg-neon-active' :
                                    n.type === 'error' ? 'bg-secondary text-surface' :
                                        'bg-tertiary text-surface'
                                }`}>
                                {n.type === 'success' ? <CheckCircle2 size={24} /> :
                                    n.type === 'error' ? <AlertTriangle size={24} /> :
                                        <Info size={24} />}
                            </div>
                            <div className="flex-1">
                                <p className="font-headline font-black text-xs uppercase leading-tight">{n.message}</p>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
                                className="hover:rotate-90 transition-transform"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
