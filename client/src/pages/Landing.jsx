import React from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    Github,
    Zap,
    Shield,
    BarChart3,
    Cpu,
    Sun,
    LayoutDashboard,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-surface border-4 border-primary p-8 neo-shadow transition-all group hover:bg-neon-active"
    >
        <div className="p-4 bg-primary text-surface mb-6 inline-block border-2 border-primary group-hover:bg-surface group-hover:text-primary transition-colors">
            <Icon size={32} />
        </div>
        <h3 className="font-display font-black text-2xl uppercase mb-4 tracking-tighter">{title}</h3>
        <p className="font-headline font-bold text-xs uppercase opacity-70 leading-relaxed">{description}</p>
    </motion.div>
);

const Landing = () => {
    return (
        <div className="min-h-screen bg-primary-container text-primary selection:bg-neon-active selection:text-primary">
            {/* Header / Nav */}
            <nav className="container mx-auto px-6 py-8 flex justify-between items-center bg-surface border-b-8 border-primary neo-shadow sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <h1 className="font-display font-black text-4xl italic tracking-tighter">SOLAR_OS</h1>
                    <div className="w-3 h-3 bg-neon-active border-2 border-primary animate-pulse"></div>
                </div>
                <div className="hidden md:flex gap-8 font-headline font-black uppercase text-xs">
                    <a href="#features" className="hover:text-tertiary transition-colors">Imkoniyatlar</a>
                    <a href="#tech" className="hover:text-tertiary transition-colors">Texnologiyalar</a>
                    <a href="#github" className="hover:text-tertiary transition-colors">GitHub</a>
                </div>
                <Link to="/app" className="px-6 py-2 border-4 border-primary bg-primary text-surface font-headline font-black uppercase text-xs neo-brutal-btn">
                    Tizimga kirish
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="inline-block px-4 py-1 bg-tertiary text-primary border-2 border-primary font-headline font-black uppercase text-[10px] neo-shadow-sm">
                        v2.4.0 Production Ready
                    </div>
                    <h2 className="font-display font-black text-7xl md:text-8xl uppercase tracking-tighter leading-[0.9] text-primary">
                        KELAJAK <span className="text-secondary italic">ENERGIYASI</span> NAZORAT OSTIDA.
                    </h2>
                    <p className="font-headline font-bold text-lg uppercase opacity-80 max-w-lg leading-tight">
                        Quyosh panellari, aqlli qurilmalar va energiya zahirasini yagona ekotizimda boshqaring. Neo-Brutalist dizayn va maksimal tezlik.
                    </p>
                    <div className="flex flex-wrap gap-6 pt-4">
                        <a
                            href="https://github.com/diyorrr000/quyoshpanel/raw/main/Solar_Control_System.exe"
                            className="flex items-center gap-4 px-10 py-6 border-4 border-primary bg-neon-active text-primary font-display font-black uppercase text-xl neo-shadow neo-brutal-btn"
                        >
                            <Download size={28} />
                            Dasturni yuklab olish (.EXE)
                        </a>
                        <Link
                            to="/app"
                            className="flex items-center gap-4 px-10 py-6 border-4 border-primary bg-surface text-primary font-display font-black uppercase text-xl neo-shadow neo-brutal-btn"
                        >
                            <LayoutDashboard size={28} />
                            Veb-versiya
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-primary border-8 border-primary neo-shadow aspect-video overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-neon-active/20 group-hover:bg-neon-active/0 transition-colors z-10 pointer-events-none"></div>
                    <img
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop"
                        alt="Solar Dashboard Preview"
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute bottom-6 left-6 p-4 bg-primary text-surface border-4 border-primary neo-shadow z-20">
                        <p className="font-display font-black text-2xl italic tracking-tighter">DATA_CENTER_UI</p>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section id="features" className="bg-primary text-surface py-24 skew-y-1">
                <div className="container mx-auto px-6 -skew-y-1">
                    <header className="mb-20">
                        <h2 className="font-display font-black text-6xl uppercase tracking-tighter mb-4 text-tertiary">MUKAMMAL MONITORING</h2>
                        <p className="text-xl font-headline font-bold uppercase opacity-60">Dasturning asosiy imkoniyatlari va bo'limlari</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={BarChart3}
                            title="Energiya Tahlili"
                            description="Real vaqtda kVt ishlab chiqarish va sarfni dinamik grafiklarda kuzating."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Avtomatlashtirish"
                            description="Harorat yoki quyosh nuriga qarab ishlaydigan mantiqiy ssenariylar."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Yuqori Himoya"
                            description="AI-fayervol va 2FA orqali tizimni ruxsatsiz kirishdan saqlang."
                        />
                        <FeatureCard
                            icon={Cpu}
                            title="Qurilmalar Nazorati"
                            description="Elektr asboblarini uydan chiqmasdan, dunyoning istalgan joyidan boshqaring."
                        />
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="tech" className="container mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="font-display font-black text-5xl uppercase tracking-tighter mb-8 border-b-8 border-primary pb-4">TEXNIK TA'MINOT</h2>
                        <div className="space-y-6">
                            {[
                                { t: "Frontend", v: "React, Tailwind CSS, Framer Motion" },
                                { t: "Backend", v: "Node.js, Express, MySQL" },
                                { t: "Analytics", v: "Chart.js, i18next Localization" },
                                { t: "Desktop", v: "C# WebView Wrapper (.EXE)" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-end border-b-4 border-dotted border-primary pb-4">
                                    <span className="font-display font-black text-2xl uppercase italic">{item.t}</span>
                                    <span className="font-headline font-bold text-xs uppercase text-secondary">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-surface border-4 border-primary p-12 neo-shadow">
                        <h3 className="font-headline font-black text-3xl uppercase mb-8 italic">Qanday ishlatiladi?</h3>
                        <div className="space-y-8">
                            {[
                                { step: "01", text: "Proyektni GitHub'dan yuklab oling yoki clone qiling." },
                                { step: "02", text: "Client va Server papkalarida 'npm install' buyrug'ini bering." },
                                { step: "03", text: "Desktop versiya uchun '.exe' faylini ishga tushiring." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <span className="font-display font-black text-4xl text-neon-active bg-primary px-3 py-1 neo-shadow-sm">{step.step}</span>
                                    <p className="font-headline font-bold text-sm uppercase leading-tight pt-2">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="github" className="container mx-auto px-6 py-24">
                <div className="bg-secondary text-surface p-16 border-8 border-primary neo-shadow text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-8 opacity-10">
                        <Github size={200} />
                    </div>
                    <h2 className="font-display font-black text-7xl uppercase tracking-tighter mb-8 relative z-10">OCHIQ MANBA KODI</h2>
                    <p className="font-headline font-bold text-xl uppercase mb-12 opacity-80 max-w-3xl mx-auto relative z-10">
                        Loyiha to'liq ochiq manba kodli va GitHub'da mavjud. Hissa qo'shing yoki o'z ehtiyojlaringizga moslang.
                    </p>
                    <a
                        href="https://github.com/diyorrr000/quyoshpanel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-12 py-6 border-4 border-primary bg-surface text-primary font-display font-black uppercase text-2xl neo-shadow neo-brutal-btn relative z-10"
                    >
                        <Github size={32} />
                        GitHub repozitoriyasi
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-surface py-12 border-t-8 border-primary">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <p className="font-display font-black text-2xl italic tracking-tighter">SOLAR_OS © 2026</p>
                        <p className="text-[10px] font-bold uppercase opacity-40 mt-1 uppercase">Diyorrr000 tomonidan yaratildi</p>
                    </div>
                    <div className="flex gap-8 font-headline font-black uppercase text-[10px]">
                        <a href="#" className="hover:text-tertiary">Maxfiylik</a>
                        <a href="#" className="hover:text-tertiary">Shartlar</a>
                        <a href="mailto:support@solaris.uz" className="hover:text-tertiary">Aloqa</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
