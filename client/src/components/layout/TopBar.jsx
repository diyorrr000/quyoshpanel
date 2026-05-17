import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Globe, Bell, User, LogOut, Shield } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationProvider';

const TopBar = () => {
    const { t } = useTranslation();
    const { theme } = useSettings();
    const { logout, user } = useAuth();
    const { showNotification } = useNotification();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        showNotification("Tizimdan muvaffaqiyatli chiqildi", "info");
        setTimeout(logout, 1000);
    };

    return (
        <header className="h-20 bg-surface border-b-4 border-primary flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Tizim bo'ylab qidirish..."
                        className="bg-surface border-2 border-primary focus:ring-0 focus:border-tertiary px-4 py-2 pl-10 font-headline font-bold text-sm w-80 placeholder:text-primary/40 transition-all focus:w-96"
                    />
                    <Search className="absolute left-3 top-2.5 opacity-50" size={18} />
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex gap-4">
                    <button
                        onClick={() => showNotification("Til o'zgartirish sozlamalarga yo'naltirildi", "info")}
                        className="text-primary hover:bg-primary hover:text-surface p-2 transition-colors border-2 border-transparent hover:border-primary"
                    >
                        <Globe size={22} />
                    </button>
                    <div className="relative group">
                        <button
                            onClick={() => showNotification("Hozirda yangi bildirishnomalar yo'q")}
                            className="text-primary hover:bg-primary hover:text-surface p-2 transition-colors border-2 border-transparent hover:border-primary"
                        >
                            <Bell size={22} />
                        </button>
                        <span className="absolute top-1 right-1 w-3 h-3 bg-secondary border-2 border-primary animate-pulse"></span>
                    </div>
                </div>

                <div className="relative">
                    <div
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="hidden md:block text-right">
                            <p className="font-headline font-black text-xs uppercase tracking-wider text-primary">ADMIN_CORE</p>
                            <p className="text-[8px] font-bold opacity-60 uppercase">Super User</p>
                        </div>
                        <div className="w-10 h-10 border-2 border-primary overflow-hidden bg-primary-container flex items-center justify-center neo-shadow-sm group-hover:neo-shadow-active transition-all">
                            <User size={24} className="text-primary" />
                        </div>
                    </div>

                    {showProfileMenu && (
                        <div className="absolute top-full right-0 mt-4 w-64 bg-surface border-4 border-primary neo-shadow z-50 p-2">
                            <div className="p-4 border-b-2 border-primary mb-2">
                                <p className="font-headline font-black text-sm uppercase">Ali Valiyev</p>
                                <p className="text-[10px] font-bold opacity-60">ali@solar.uz</p>
                            </div>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-surface-container font-headline font-bold text-xs uppercase transition-all">
                                <User size={18} /> Profil sozlamalari
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-surface-container font-headline font-bold text-xs uppercase transition-all">
                                <Shield size={18} /> Xavfsizlik
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 p-3 hover:bg-secondary hover:text-surface font-headline font-black text-xs uppercase transition-all border-t-2 border-primary mt-2"
                            >
                                <LogOut size={18} /> Tizimdan chiqish
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
