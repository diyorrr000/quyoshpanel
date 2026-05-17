import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Clock, Sun, Moon, Play, Settings2, Trash2, Plus } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Automation = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [scenarios, setScenarios] = useState([
        { id: 1, name: "Kunduzgi Maksimal Quvvat", trigger: "Quyosh nuri > 80%", action: "Zaryadlashni boshlash", icon: Sun, active: true, color: "text-tertiary" },
        { id: 2, name: "Tungi Tejamkorlik", trigger: "Soat 22:00 dan keyin", action: "Yoritishni 20% gacha pasaytirish", icon: Moon, active: true, color: "text-primary" },
        { id: 3, name: "Favqulodda Zaxira", trigger: "Tarmoq o'chishi", action: "Batareya tizimiga o'tish", icon: Zap, active: false, color: "text-secondary" },
        { id: 4, name: "Aqlli Sug'orish", trigger: "Namlik < 15%", action: "Nasosni yoqish", icon: Clock, active: true, color: "text-neon-active" },
    ]);

    const toggleScenario = (id) => {
        setScenarios(prev => prev.map(s => {
            if (s.id === id) {
                const nextActive = !s.active;
                showNotification(`"${s.name}" ${nextActive ? 'faollashtirildi' : "o'chirildi"}`, nextActive ? "success" : "warning");
                return { ...s, active: nextActive };
            }
            return s;
        }));
    };

    const runScenario = (name) => {
        showNotification(`"${name}" stsenariysi qo'lda ishga tushirildi...`, "info");
        setTimeout(() => {
            showNotification(`"${name}" muvaffaqiyatli bajarildi`, "success");
        }, 1500);
    };

    const deleteScenario = (id) => {
        setScenarios(prev => prev.filter(s => s.id !== id));
        showNotification("Stsenariy o'chirildi", "error");
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        AVTOMATIKA<span className="text-tertiary">.mantiq</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Aqlli stsenariylar va avtomatlashtirilgan jarayonlar boshqaruvi</p>
                </div>
                <button
                    onClick={() => showNotification("Stsenariy yaratish interfeysi ochildi", "info")}
                    className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-neon-active text-primary font-headline font-black uppercase text-sm neo-shadow neo-brutal-btn"
                >
                    <Plus size={20} />
                    Yangi stsenariy
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {scenarios.map((scenario) => (
                        <motion.div
                            key={scenario.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-surface border-4 border-primary p-8 neo-shadow flex flex-col justify-between transition-all ${!scenario.active && 'opacity-60 grayscale'}`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`p-4 border-2 border-primary bg-surface ${scenario.color}`}>
                                    <scenario.icon size={32} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => runScenario(scenario.name)}
                                        className="p-3 border-2 border-primary hover:bg-neon-active transition-all neo-brutal-btn"
                                    >
                                        <Play size={18} fill="currentColor" />
                                    </button>
                                    <button className="p-3 border-2 border-primary hover:bg-surface-container transition-all neo-brutal-btn">
                                        <Settings2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteScenario(scenario.id)}
                                        className="p-3 border-2 border-primary hover:bg-secondary hover:text-surface transition-all neo-brutal-btn"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-2">{scenario.name}</h3>
                                <div className="space-y-2 mt-4 text-[10px] font-black uppercase">
                                    <p className="flex justify-between border-b border-primary/10 pb-1"><span>Shart:</span> <span className="text-tertiary">{scenario.trigger}</span></p>
                                    <p className="flex justify-between border-b border-primary/10 pb-1"><span>Harakat:</span> <span className="text-primary">{scenario.action}</span></p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t-2 border-primary flex items-center justify-between">
                                <span className={`font-headline font-black text-xs uppercase ${scenario.active ? 'text-neon-active' : 'text-secondary'}`}>
                                    {scenario.active ? 'FAOL REJIM' : 'O\'CHIRILGAN'}
                                </span>
                                <button
                                    onClick={() => toggleScenario(scenario.id)}
                                    className={`w-14 h-7 border-2 border-primary relative transition-colors ${scenario.active ? 'bg-neon-active' : 'bg-surface-container'}`}
                                >
                                    <div className={`absolute top-0 bottom-0 w-1/2 bg-primary border border-primary transition-all ${scenario.active ? 'left-1/2' : 'left-0'}`} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Automation;
