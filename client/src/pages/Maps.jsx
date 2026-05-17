import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, Info, Map as MapIcon } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Maps = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [selectedZone, setSelectedZone] = useState(null);

    const zones = [
        { id: 'Z1', name: "Shimoliy Sector", coords: { x: '25%', y: '30%' }, status: 'online', efficiency: '94%' },
        { id: 'Z2', name: "Markaziy Panellar", coords: { x: '50%', y: '50%' }, status: 'online', efficiency: '98%' },
        { id: 'Z3', name: "Janubiy Massiv", coords: { x: '75%', y: '70%' }, status: 'warning', efficiency: '82%' },
        { id: 'Z4', name: "Sharqiy Qanot", coords: { x: '80%', y: '25%' }, status: 'online', efficiency: '91%' },
    ];

    const handleZoneClick = (zone) => {
        setSelectedZone(zone);
        showNotification(`${zone.name} tanlandi`, "info");
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        GEOGRAFIYA<span className="text-tertiary">.xar</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Panellar va infratuzilmaning geografik joylashuvi</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 border-4 border-primary bg-surface neo-shadow-sm neo-brutal-btn"><Layers size={24} /></button>
                    <button className="p-4 border-4 border-primary bg-surface neo-shadow-sm neo-brutal-btn"><Navigation size={24} /></button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
                <div className="lg:col-span-9 bg-primary-container border-4 border-primary neo-shadow p-4 relative overflow-hidden flex items-center justify-center">
                    {/* SVG Map Grid Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 2px, transparent 0)', backgroundSize: '40px 40px' }}
                    />

                    <div className="relative w-full h-full bg-surface border-4 border-primary neo-shadow-sm overflow-hidden group">
                        {/* Mock Map Image Representation */}
                        <div className="absolute inset-0 bg-surface-container opacity-50" />

                        {/* Map Pins */}
                        {zones.map(zone => (
                            <motion.button
                                key={zone.id}
                                whileHover={{ scale: 1.2, zIndex: 30 }}
                                onClick={() => handleZoneClick(zone)}
                                className="absolute -translate-x-1/2 -translate-y-1/2 group/pin"
                                style={{ left: zone.coords.x, top: zone.coords.y }}
                            >
                                <div className={`relative ${zone.status === 'online' ? 'text-primary' : 'text-secondary'}`}>
                                    <MapPin size={48} strokeWidth={3} fill={zone.status === 'online' ? 'var(--color-neon-active)' : 'var(--color-secondary)'} className="drop-shadow-lg" />
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-surface px-3 py-1 font-headline font-black text-[10px] uppercase border-2 border-primary neo-shadow-sm whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                                        {zone.name}
                                    </span>
                                </div>
                            </motion.button>
                        ))}

                        {/* Controls Overlay */}
                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                            <button className="p-3 bg-surface border-2 border-primary hover:bg-surface-container"><ZoomIn size={20} /></button>
                            <button className="p-3 bg-surface border-2 border-primary hover:bg-surface-container"><ZoomOut size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-8 h-full">
                    <AnimatePresence mode="wait">
                        {selectedZone ? (
                            <motion.div
                                key={selectedZone.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-surface border-4 border-primary p-8 neo-shadow h-full flex flex-col"
                            >
                                <h3 className="font-display font-black text-3xl uppercase leading-none mb-6 border-b-4 border-primary pb-4">{selectedZone.name}</h3>
                                <div className="space-y-6 flex-1">
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-60 mb-1">Samaradorlik</p>
                                        <p className="font-display font-black text-5xl">{selectedZone.efficiency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-60 mb-1">Tizim holati</p>
                                        <div className={`p-3 border-2 border-primary font-headline font-black text-center uppercase ${selectedZone.status === 'online' ? 'bg-neon-active' : 'bg-secondary text-surface'}`}>
                                            {selectedZone.status === 'online' ? 'MUNTASAM' : 'MUAMMO ANIQLANDI'}
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-auto py-4 bg-primary text-surface font-headline font-black uppercase text-xs neo-brutal-btn">Batafsil ma'lumot</button>
                            </motion.div>
                        ) : (
                            <div className="bg-surface/50 border-4 border-primary border-dashed p-8 neo-shadow h-full flex flex-col items-center justify-center text-center">
                                <MapIcon size={48} className="opacity-20 mb-4" />
                                <p className="font-headline font-black text-xs uppercase opacity-40">Ma'lumotlarni ko'rish uchun sectorni tanlang</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Maps;
