import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRealTimeData } from '../context/RealTimeDataContext';
import { useNotification } from '../context/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, AlertCircle, CheckCircle2, Play, Activity } from 'lucide-react';

const PanelNode = ({ panel, isScanning }) => {
    const isOnline = panel.status === 'online';

    return (
        <motion.div
            layout
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className={`relative aspect-square border-2 border-primary neo-shadow-sm cursor-help flex flex-col items-center justify-center transition-all duration-500 group
                ${isScanning ? 'bg-primary animate-pulse' : isOnline ? 'bg-surface hover:bg-neon-active/10' : 'bg-secondary/20 hover:bg-secondary/30'}`}
        >
            {isScanning ? (
                <Activity size={16} className="text-surface animate-spin-slow" />
            ) : (
                <>
                    <span className="font-display font-black text-lg">{panel.efficiency}%</span>
                    <span className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">TUGUN_{panel.id}</span>
                </>
            )}

            {!isOnline && !isScanning && (
                <div className="absolute top-1 right-1">
                    <AlertCircle size={10} className="text-secondary" />
                </div>
            )}

            {/* Tooltip */}
            {!isScanning && (
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-primary text-surface p-4 neo-shadow border-2 border-neon-active opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-20">
                    <h4 className="font-headline font-black text-xs uppercase mb-2 border-b border-surface/20 pb-1">PANEL_MA'L_#_{panel.id}</h4>
                    <div className="space-y-1 text-[10px] uppercase font-bold">
                        <div className="flex justify-between"><span>Kuchlanish:</span> <span className="text-tertiary">{panel.voltage} V</span></div>
                        <div className="flex justify-between"><span>Harorat:</span> <span className="text-tertiary">{panel.temp} °C</span></div>
                        <div className="flex justify-between"><span>Holati:</span> <span className={isOnline ? 'text-neon-active' : 'text-secondary'}>{isOnline ? 'FAOL' : 'TEXNIK XIZMAT'}</span></div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const SolarPanels = () => {
    const { t } = useTranslation();
    const { panels: initialPanels } = useRealTimeData();
    const { showNotification } = useNotification();
    const [panels, setPanels] = useState([]);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        setPanels(initialPanels);
    }, [initialPanels]);

    const startDeepScan = () => {
        setIsScanning(true);
        showNotification("Tizim bo'ylab chuqur skanerlash boshlandi...", "info");

        setTimeout(() => {
            setIsScanning(false);
            setPanels(prev => prev.map(p => ({ ...p, status: 'online', efficiency: Math.max(p.efficiency, 90) })));
            showNotification("Skanerlash yakunlandi. Barcha panellar optimallashtirildi.", "success");
        }, 3000);
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="font-display font-black text-7xl uppercase tracking-tighter leading-none text-primary">
                        PANELLAR SETI
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Barcha 48 ta panelning jonli holati va samaradorligi</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={startDeepScan}
                        disabled={isScanning}
                        className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-neon-active text-primary font-headline font-black uppercase text-sm neo-shadow neo-brutal-btn disabled:opacity-50 disabled:grayscale"
                    >
                        <Play size={20} fill="currentColor" />
                        Diagnostikani boshlash
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 border-4 border-primary bg-surface neo-shadow-sm">
                        <div className="w-3 h-3 bg-neon-active border-2 border-primary" />
                        <span className="text-[10px] font-black uppercase">Ishlamoqda ({panels.filter(p => p.status === 'online').length})</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                <AnimatePresence>
                    {panels.map((panel) => (
                        <PanelNode key={panel.id} panel={panel} isScanning={isScanning} />
                    ))}
                </AnimatePresence>
            </div>

            <div className="bg-primary text-surface p-8 border-4 border-primary neo-shadow">
                <div className="flex items-center gap-4 mb-4">
                    <Info size={32} className="text-tertiary" />
                    <h3 className="font-headline font-black text-2xl uppercase">Panel holati tahlili</h3>
                </div>
                <p className="font-body text-sm font-medium opacity-80 leading-relaxed max-w-4xl">
                    Tizim hozirda maksimal quvvat bilan ishlamoqda. Sector 7 da joylashgan panellar quyoshning to'g'ridan-to'g'ri tushishi hisobiga 96% samaradorlik ko'rsatmoqda. Sector 2 da biroz chang bosishi kuzatilmoqda, tozalash rejalashtirilsin.
                </p>
            </div>
        </div>
    );
};

export default SolarPanels;
