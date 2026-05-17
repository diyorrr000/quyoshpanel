import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../context/SettingsContext';
import { Moon, Sun, Type, Maximize, Globe, Save } from 'lucide-react';

const Settings = () => {
    const { t, i18n } = useTranslation();
    const {
        theme, setTheme,
        fontSize, setFontSize,
        interfaceScale, setInterfaceScale,
        language, setLanguage
    } = useSettings();

    const handleLanguageChange = (id) => {
        setLanguage(id);
        i18n.changeLanguage(id);
    };

    return (
        <div className="space-y-12 max-w-4xl">
            <header>
                <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                    TIZIM_SOZLAMALARI<span className="text-tertiary">.cfg</span>
                </h2>
                <p className="text-xs font-bold uppercase opacity-60 mt-2">Interfeys va tizim afzalliklarini boshqarish</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Theme Selection */}
                <div className="bg-surface border-4 border-primary p-8 neo-shadow">
                    <div className="flex items-center gap-3 mb-8">
                        <Sun size={24} className="text-tertiary" />
                        <h3 className="font-headline font-black text-xl uppercase italic">Mavzu (Theme)</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'light', label: "Yorug'", icon: Sun },
                            { id: 'dark', label: "To'q", icon: Moon },
                            { id: 'neon', label: 'Neon', icon: Sun },
                            { id: 'auto', label: 'Avto', icon: Globe }
                        ].map(mode => (
                            <button
                                key={mode.id}
                                onClick={() => setTheme(mode.id)}
                                className={`flex flex-col items-center gap-3 p-4 border-2 border-primary neo-shadow-sm transition-all ${theme === mode.id ? 'bg-primary text-surface scale-105' : 'hover:bg-surface-container'}`}
                            >
                                <mode.icon size={24} />
                                <span className="text-[10px] font-black uppercase">{mode.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language Selection */}
                <div className="bg-surface border-4 border-primary p-8 neo-shadow">
                    <div className="flex items-center gap-3 mb-8">
                        <Globe size={24} className="text-secondary" />
                        <h3 className="font-headline font-black text-xl uppercase italic">Tizim Tili</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { id: 'uz', label: "O'zbekcha" },
                            { id: 'en', label: 'English' },
                            { id: 'ru', label: 'Русский' }
                        ].map(lang => (
                            <button
                                key={lang.id}
                                onClick={() => handleLanguageChange(lang.id)}
                                className={`w-full flex justify-between items-center px-6 py-4 border-2 border-primary font-headline font-black uppercase text-xs transition-all ${language === lang.id ? 'bg-secondary text-surface' : 'hover:bg-surface-container'}`}
                            >
                                {lang.label}
                                {language === lang.id && <Save size={16} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Size */}
                <div className="bg-surface border-4 border-primary p-8 neo-shadow">
                    <div className="flex items-center gap-3 mb-8">
                        <Type size={24} className="text-primary" />
                        <h3 className="font-headline font-black text-xl uppercase italic">Shrift Hajmi</h3>
                    </div>
                    <div className="space-y-4">
                        {['Small', 'Medium', 'Large', 'Extra Large'].map(size => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className={`w-full text-left px-6 py-3 border-2 border-primary font-headline font-bold uppercase text-xs transition-all ${fontSize === size ? 'bg-primary text-surface' : 'hover:bg-surface-container'}`}
                            >
                                {size === 'Small' ? 'Kichik' : size === 'Medium' ? "O'rtacha" : size === 'Large' ? 'Katta' : 'Juda Katta'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interface Scale */}
                <div className="bg-surface border-4 border-primary p-8 neo-shadow">
                    <div className="flex items-center gap-3 mb-8">
                        <Maximize size={24} className="text-tertiary" />
                        <h3 className="font-headline font-black text-xl uppercase italic">Interfeys Masshtabi</h3>
                    </div>
                    <input
                        type="range"
                        min="80"
                        max="150"
                        value={parseInt(interfaceScale)}
                        onChange={(e) => setInterfaceScale(`${e.target.value}%`)}
                        className="w-full h-4 bg-surface-container border-2 border-primary appearance-none cursor-pointer accent-primary mb-4"
                    />
                    <p className="font-display font-black text-4xl text-center">{interfaceScale}</p>
                </div>
            </div>

            <div className="bg-tertiary/10 border-4 border-primary p-8 neo-shadow">
                <p className="font-headline font-bold text-xs uppercase opacity-80 leading-relaxed italic">
                    DIQQAT: Tizim sozlamalari ushbu brauzerda avtomatik saqlanadi. Bulutli sinxronizatsiya uchun tizimga kirishingiz tavsiya etiladi.
                </p>
            </div>
        </div>
    );
};

export default Settings;
