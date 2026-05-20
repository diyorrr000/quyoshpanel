import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../context/NotificationProvider';
import {
    LayoutDashboard,
    Sun,
    Cpu,
    BarChart3,
    BatteryCharging,
    CloudSun,
    FileText,
    Bell,
    ShieldCheck,
    Zap,
    Map as MapIcon,
    Users,
    Settings,
    LifeBuoy,
    Power
} from 'lucide-react';

const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'dashboard' },
    { path: '/panels', icon: Sun, label: 'solar_panels' },
    { path: '/devices', icon: Cpu, label: 'devices' },
    { path: '/analytics', icon: BarChart3, label: 'analytics' },
    { path: '/battery', icon: BatteryCharging, label: 'battery' },
    { path: '/weather', icon: CloudSun, label: 'weather' },
    { path: '/reports', icon: FileText, label: 'reports' },
    { path: '/notifications', icon: Bell, label: 'notifications' },
    { path: '/security', icon: ShieldCheck, label: 'security' },
    { path: '/automation', icon: Zap, label: 'automation' },
    { path: '/users', icon: Users, label: 'users' },
    { path: '/settings', icon: Settings, label: 'settings' },
    { path: '/support', icon: LifeBuoy, label: 'support' },
];

const Sidebar = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const handleEmergencyStop = () => {
        showNotification("FAVQULODDA TO'XTATISH ISHGA TUSHIRILDI! Tizim o'chirilmoqda...", "error");
        console.error("EMERGENCY STOP TRIGGERED");
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-surface border-r-4 border-primary flex flex-col justify-between py-6 z-50 overflow-y-auto transition-colors duration-300">
            <div>
                <div className="px-6 mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="font-headline font-black text-3xl italic tracking-tighter text-primary">SOLAR OS</h1>
                        <p className="font-headline font-bold text-[8px] uppercase opacity-40">Build v2.4.0-stable</p>
                    </div>
                    <div className="w-3 h-3 bg-neon-active border-2 border-primary animate-pulse"></div>
                </div>
                <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 mx-4 my-0.5 p-3 font-headline font-bold uppercase transition-all duration-75
                                ${isActive
                                    ? 'bg-primary-container border-2 border-primary text-primary neo-shadow-sm translate-x-1 translate-y-1'
                                    : 'text-primary border-2 border-transparent hover:border-primary hover:bg-surface-container'
                                }
                            `}
                        >
                            <item.icon size={18} />
                            <span className="text-[11px] tracking-tight">{t(`sidebar.${item.label}`)}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="px-4 mt-6">
                <button
                    onClick={handleEmergencyStop}
                    className="w-full bg-secondary text-surface font-headline font-black uppercase py-4 border-4 border-primary neo-shadow hover:neo-shadow-sm active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                    <Power size={20} />
                    {t('sidebar.emergency_stop')}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
