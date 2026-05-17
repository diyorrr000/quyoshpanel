import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Wind, Droplets, Thermometer, CloudRain, Sunrise, Sunset, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotification } from '../context/NotificationProvider';

const Weather = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const handleRefresh = () => {
        showNotification("Ob-havo ma'lumotlari yangilanmoqda...", "info");
        setTimeout(() => {
            showNotification("Ma'lumotlar muvaffaqiyatli yangilandi", "success");
        }, 1500);
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        METEO_GRID<span className="text-tertiary">.log</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Atmosfera holati va quyosh radiatsiyasi monitoringi</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-primary text-surface neo-shadow neo-brutal-btn font-headline font-black uppercase text-sm"
                >
                    <RefreshCw size={20} />
                    Yangilash
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-surface border-4 border-primary p-12 neo-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-primary-fixed drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]"
                        >
                            <Sun size={120} strokeWidth={3} />
                        </motion.div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="font-display font-black text-8xl leading-none">32°C</h3>
                        <p className="font-headline font-black text-2xl uppercase italic tracking-widest mt-2">Musaffo osmon / Yuqori UV</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            {[
                                { icon: Wind, label: 'Shamol tezligi', value: '14 km/soat' },
                                { icon: Droplets, label: 'Namlik', value: '28%' },
                                { icon: Sunrise, label: 'UV Indeksi', value: '8.4 (Yuqori)' },
                                { icon: Sunset, label: 'Bosim', value: '1012 hPa' }
                            ].map(item => (
                                <div key={item.label}>
                                    <item.icon className="text-tertiary mb-3" size={32} />
                                    <p className="text-[10px] font-bold uppercase opacity-60">{item.label}</p>
                                    <p className="font-headline font-black text-xl uppercase">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-primary text-primary-fixed border-4 border-primary p-8 neo-shadow">
                        <h3 className="font-headline font-black text-2xl uppercase mb-6 border-b-2 border-primary-fixed/30 pb-4">Kunlik prognoz</h3>
                        <div className="space-y-4">
                            {[
                                { time: '14:00', temp: '34°', icon: Sun },
                                { time: '17:00', temp: '28°', icon: CloudRain },
                                { time: '20:00', temp: '22°', icon: Sunrise }
                            ].map(slot => (
                                <div key={slot.time} className="flex justify-between items-center bg-surface text-primary p-4 border-2 border-primary-fixed">
                                    <span className="font-headline font-black">{slot.time}</span>
                                    <slot.icon size={20} />
                                    <span className="font-display font-black text-xl">{slot.temp}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
