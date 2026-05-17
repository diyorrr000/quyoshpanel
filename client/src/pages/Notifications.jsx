import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Check, Trash2, Info, AlertTriangle, Zap, X } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [notifications, setNotifications] = useState([
        { id: 1, title: "Tizim yangilanishi", message: "SOLAR_OS v2.4.0 muvaffaqiyatli yuklandi.", time: "10 daqiqa oldin", type: "info", read: false },
        { id: 2, title: "Yuqori harorat", message: "Panel #108 harorati 45°C dan oshdi.", time: "45 daqiqa oldin", type: "warning", read: false },
        { id: 3, title: "Quvvat sarfi", message: "Bugungi ishlab chiqarish rekordi yangilandi: 1.2 GVat.", time: "2 soat oldin", type: "success", read: true },
        { id: 4, title: "Xavfsizlik", message: "Yangi qurilma (EV Charger) tarmoqqa ulandi.", time: "5 soat oldin", type: "info", read: true },
        { id: 5, title: "Nosozlik", message: "Inverter #04 aloqani yo'qotdi.", time: "Kecha", type: "error", read: true },
    ]);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        showNotification("Xabar o'qilgan deb belgilandi");
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        showNotification("Xabar o'chirib tashlandi", "error");
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        showNotification("Barcha xabarlar o'qildi", "success");
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        BILDIRISHNOMALAR<span className="text-tertiary">.xab</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Tizim bildirishnomalari va ogohlantirishlar xronologiyasi</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="px-6 py-3 border-4 border-primary bg-surface neo-shadow-sm neo-brutal-btn font-headline font-black uppercase text-xs"
                >
                    Hammasini o'qilgan deb belgilash
                </button>
            </header>

            <div className="bg-surface border-4 border-primary neo-shadow overflow-hidden">
                <div className="divide-y-4 divide-primary">
                    <AnimatePresence>
                        {notifications.length > 0 ? (
                            notifications.map((n) => (
                                <motion.div
                                    key={n.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className={`p-6 flex items-start gap-6 transition-colors ${n.read ? 'bg-surface opacity-80' : 'bg-primary-container'}`}
                                >
                                    <div className={`p-4 border-2 border-primary ${n.type === 'info' ? 'bg-surface' :
                                            n.type === 'success' ? 'bg-neon-active' :
                                                n.type === 'warning' ? 'bg-tertiary text-primary' :
                                                    'bg-secondary text-surface'
                                        }`}>
                                        {n.type === 'info' && <Info size={24} />}
                                        {n.type === 'success' && <Check size={24} />}
                                        {n.type === 'warning' && <AlertTriangle size={24} />}
                                        {n.type === 'error' && <Zap size={24} />}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-headline font-black text-lg uppercase tracking-tight">{n.title}</h4>
                                            <span className="text-[10px] font-black uppercase opacity-40">{n.time}</span>
                                        </div>
                                        <p className="font-headline font-bold text-sm uppercase leading-relaxed text-primary/80">{n.message}</p>

                                        <div className="mt-4 flex gap-4">
                                            {!n.read && (
                                                <button
                                                    onClick={() => markAsRead(n.id)}
                                                    className="text-[10px] font-black uppercase underline hover:text-tertiary transition-colors"
                                                >
                                                    O'qilgan deb belgilash
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(n.id)}
                                                className="text-[10px] font-black uppercase underline text-secondary hover:text-red-700 transition-colors"
                                            >
                                                O'chirish
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-20 text-center">
                                <Bell size={64} className="mx-auto mb-6 opacity-20" />
                                <p className="font-display font-black text-2xl uppercase opacity-40">Yangi bildirishnomalar yo'q</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
