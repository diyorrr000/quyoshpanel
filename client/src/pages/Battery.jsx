import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRealTimeData } from '../context/RealTimeDataContext';
import { useNotification } from '../context/NotificationProvider';
import { motion } from 'framer-motion';
import { Battery as BatteryIcon, Thermometer, ShieldCheck, Zap, RefreshCw, AlertTriangle } from 'lucide-react';

const Battery = () => {
    const { t } = useTranslation();
    const data = useRealTimeData();
    const { showNotification } = useNotification();

    const handleOptimization = () => {
        showNotification("Kuchlanish optimallashtirilmoqda...", "info");
        setTimeout(() => {
            showNotification("Batareya hujayralari muvozanatlashdi.", "success");
        }, 3000);
    };

    const handleHealthCheck = () => {
        showNotification("Chuqur diagnostika boshlandi...", "info");
        setTimeout(() => {
            showNotification("Hujayralar holati: 100% SOG'LOM", "success");
        }, 2000);
    }

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        BATAREYA_MANTE<span className="text-tertiary">.sys</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Energiya saqlash va quvvat taqsimoti</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleHealthCheck}
                        className="flex items-center gap-3 px-6 py-3 border-4 border-primary bg-surface neo-shadow-sm neo-brutal-btn font-headline font-black uppercase text-xs"
                    >
                        <RefreshCw size={18} />
                        Diagnostika
                    </button>
                    <button
                        onClick={handleOptimization}
                        className="flex items-center gap-3 px-6 py-3 border-4 border-primary bg-neon-active text-primary neo-shadow neo-brutal-btn font-headline font-black uppercase text-xs"
                    >
                        <Zap size={18} />
                        Optimallashtirish
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 bg-surface border-4 border-primary p-12 neo-shadow flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block mb-8">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-secondary"
                            >
                                <BatteryIcon size={120} strokeWidth={1} />
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center pt-2">
                                <span className="font-display font-black text-3xl">{data.batteryLevel}%</span>
                            </div>
                        </div>
                        <h3 className="font-headline font-black text-2xl uppercase italic">Quvvat holati</h3>
                        <p className="text-[10px] font-bold uppercase opacity-60 mt-2">Zaxira quvvati: 42.5 kVt/soat</p>
                    </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { icon: Thermometer, label: 'Bataharorat', value: `${data.batteryTemp} °C`, status: 'Normal', color: 'text-tertiary' },
                        { icon: Zap, label: 'Zaryadlash tezligi', value: '4.8 kVt', status: 'Faol', color: 'text-secondary' },
                        { icon: ShieldCheck, label: 'Hujayralar holati', value: '99.2%', status: "Sog'lom", color: 'text-neon-active' },
                        { icon: BatteryIcon, label: 'Tsikllar soni', value: '142', status: 'Yaxshi', color: 'text-primary' }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface border-4 border-primary p-8 neo-shadow group hover:bg-surface-container transition-colors">
                            <item.icon className={`${item.color} mb-4`} size={40} />
                            <p className="text-[10px] font-bold uppercase opacity-60">{item.label}</p>
                            <h4 className="font-display font-black text-4xl uppercase mt-1">{item.value}</h4>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neon-active shadow-[0_0_8px_#39ff14]" />
                                <span className="text-[10px] font-black uppercase text-tertiary tracking-widest">{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="bg-primary text-primary-fixed border-4 border-primary p-10 neo-shadow">
                <h3 className="font-display font-black text-3xl uppercase mb-6 flex items-center gap-3">
                    <Activity size={28} />
                    Termal Tahlil
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <p className="text-xs font-black uppercase opacity-60">Sovutish tizimi</p>
                        <div className="h-4 border-2 border-primary-fixed bg-surface/20 flex">
                            <div className="bg-tertiary w-[65%]" />
                        </div>
                        <p className="font-headline font-bold text-sm tracking-widest">FAOL - 65% RPM</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Activity = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

export default Battery;
