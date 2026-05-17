import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, ShieldAlert, Key, Lock, Fingerprint, Eye, RefreshCw } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion } from 'framer-motion';

const SecurityToggle = ({ label, description, enabled, onToggle, icon: Icon }) => (
    <div className="bg-surface border-4 border-primary p-6 neo-shadow flex items-center justify-between group transition-all hover:bg-surface-container">
        <div className="flex items-center gap-4">
            <div className={`p-4 border-2 border-primary ${enabled ? 'bg-neon-active' : 'bg-surface-container-highest opacity-50'}`}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="font-headline font-black text-sm uppercase">{label}</h4>
                <p className="text-[10px] font-bold opacity-60 uppercase">{description}</p>
            </div>
        </div>
        <button
            onClick={onToggle}
            className={`w-16 h-8 border-4 border-primary relative transition-colors ${enabled ? 'bg-neon-active' : 'bg-surface-container'}`}
        >
            <div className={`absolute top-0 bottom-0 w-1/2 bg-primary border-2 border-primary transition-all ${enabled ? 'left-1/2' : 'left-0'}`} />
        </button>
    </div>
);

const Security = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [settings, setSettings] = useState({
        twoFactor: true,
        firewall: true,
        biometric: false,
        stealthMode: false,
        remoteLock: true
    });

    const toggleSetting = (key, label) => {
        setSettings(prev => {
            const nextValue = !prev[key];
            showNotification(`${label} ${nextValue ? 'yoqildi' : "o'chirildi"}`, nextValue ? 'success' : 'warning');
            return { ...prev, [key]: nextValue };
        });
    };

    const handleSystemReset = () => {
        showNotification("Xavfsizlik kalitlari qayta generatsiya qilinmoqda...", "info");
        setTimeout(() => {
            showNotification("Tizim xavfsizlik protokollari yangilandi", "success");
        }, 2000);
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        XAVFSIZLIK<span className="text-secondary">.him</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Kriptografik himoya va kirish nazorati sozlamalari</p>
                </div>
                <button
                    onClick={handleSystemReset}
                    className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-secondary text-surface font-headline font-black uppercase text-sm neo-shadow neo-brutal-btn"
                >
                    <RefreshCw size={20} />
                    Xavfsizlikni yangilash
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SecurityToggle
                    label="Ikki bosqichli autentifikatsiya"
                    description="SMS yoki Email orqali tasdiqlash"
                    enabled={settings.twoFactor}
                    onToggle={() => toggleSetting('twoFactor', '2FA')}
                    icon={Key}
                />
                <SecurityToggle
                    label="Aqlli Fayervol"
                    description="AI orqali tarmoq trafiki tahlili"
                    enabled={settings.firewall}
                    onToggle={() => toggleSetting('firewall', 'Fayervol')}
                    icon={Shield}
                />
                <SecurityToggle
                    label="Biometrik Kirish"
                    description="Barmoq izi yoki yuzni aniqlash"
                    enabled={settings.biometric}
                    onToggle={() => toggleSetting('biometric', 'Biometrika')}
                    icon={Fingerprint}
                />
                <SecurityToggle
                    label="Maxfiy Rejim"
                    description="Tizim IP-manzilini yashirish"
                    enabled={settings.stealthMode}
                    onToggle={() => toggleSetting('stealthMode', 'Maxfiy rejim')}
                    icon={Eye}
                />
                <SecurityToggle
                    label="Masofaviy Blokirovka"
                    description="Xavf tug'ilganda tizimni o'chirish"
                    enabled={settings.remoteLock}
                    onToggle={() => toggleSetting('remoteLock', 'Masofaviy blokirovka')}
                    icon={Lock}
                />

                <div className="bg-primary text-surface p-8 border-4 border-primary neo-shadow flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-tertiary">
                        <ShieldAlert size={40} />
                        <h3 className="font-display font-black text-2xl uppercase italic">Xavf darajasi: PAST</h3>
                    </div>
                    <p className="font-headline font-bold text-xs uppercase opacity-80 leading-relaxed">
                        Oxirgi 30 kun ichida hech qanday ruxsatsiz kirishga urinish qayd etilmadi. Barcha xavfsizlik paketlari yangilangan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Security;
