import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Power, Zap, Ban, Timer, Plus } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion } from 'framer-motion';

const DeviceCard = ({ device, onToggle }) => {
    const isOnline = device.status === 'online';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-surface border-4 border-primary p-6 neo-shadow flex flex-col justify-between transition-all duration-500 ${!isOnline && 'grayscale opacity-60'}`}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary text-primary-fixed border-2 border-primary">
                    <Cpu size={24} />
                </div>
                <div className={`px-3 py-1 border-2 border-primary font-headline font-black text-[10px] uppercase transition-colors duration-500 ${isOnline ? 'bg-neon-active text-primary' : 'bg-secondary text-surface'}`}>
                    {isOnline ? 'Onlayn' : device.status === 'offline' ? 'Oflayn' : 'Texnik xizmat'}
                </div>
            </div>

            <div>
                <h4 className="font-headline font-black text-xl uppercase tracking-tighter mb-1">{device.name}</h4>
                <p className="text-[10px] font-bold uppercase opacity-60">{device.type}</p>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-tertiary" />
                        <span className="text-xs font-bold uppercase">Joriy yuklama</span>
                    </div>
                    <span className="font-display font-black text-lg">{isOnline ? device.consumption : '0.0'} kVt</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Timer size={14} className="text-primary" />
                        <span className="text-xs font-bold uppercase">Ish vaqti</span>
                    </div>
                    <span className="font-label font-bold text-xs">{device.uptime}</span>
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button
                    onClick={() => onToggle(device.id)}
                    className={`flex-1 py-3 border-2 border-primary font-headline font-black uppercase text-[10px] neo-brutal-btn transition-all duration-300 ${isOnline ? 'bg-secondary text-surface shadow-none translate-x-1 translate-y-1' : 'bg-neon-active text-primary'}`}
                >
                    {isOnline ? "O'chirish" : "Yoqish"}
                </button>
                <button
                    onClick={() => onToggle(device.id, "restart")}
                    className="p-3 border-2 border-primary hover:bg-surface-container transition-colors neo-brutal-btn"
                >
                    <Power size={16} />
                </button>
            </div>
        </motion.div>
    );
};

const Devices = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [devices, setDevices] = useState([
        { id: 1, name: 'EV Zaryadlovchi Alpha', type: 'Yuqori Kuchlanish', consumption: '7.2', status: 'online', uptime: '14k 2soat' },
        { id: 2, name: 'HVAC Sovutish 01', type: 'Iqlim Nazorati', consumption: '3.4', status: 'online', uptime: '156k 12soat' },
        { id: 3, name: 'Server Rack A', type: 'Muhim Hisoblash', consumption: '1.2', status: 'online', uptime: '365k 4soat' },
        { id: 4, name: 'Oshxona Tuguni', type: 'Maishiy Texnika', consumption: '0.0', status: 'offline', uptime: '0s' },
        { id: 5, name: 'Hovuz Nasosi', type: 'Kommunal', consumption: '1.5', status: 'online', uptime: '2k 1soat' },
        { id: 6, name: 'Dastgoh Asboblari', type: "Sanoat / Og'ir yuk", consumption: '0.0', status: 'maintenance', uptime: '0s' }
    ]);

    const handleToggle = (id, action = "toggle") => {
        const device = devices.find(d => d.id === id);

        if (action === "restart") {
            showNotification(`${device.name} qayta yuklanmoqda...`, "info");
            setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'offline' } : d));
            setTimeout(() => {
                setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'online' } : d));
                showNotification(`${device.name} qayta ishga tushirildi`, "success");
            }, 2000);
            return;
        }

        const nextStatus = device.status === 'online' ? 'offline' : 'online';
        setDevices(prev => prev.map(d => d.id === id ? { ...d, status: nextStatus } : d));
        showNotification(`${device.name} ${nextStatus === 'online' ? 'yoqildi' : "o'chirildi"}`, nextStatus === 'online' ? "success" : "error");
    };

    const handleAddDevice = () => {
        showNotification("Yangi qurilma qidirilmoqda...", "info");
        setTimeout(() => {
            const newDevice = {
                id: Date.now(),
                name: `Yangi tugun #${Math.floor(Math.random() * 1000)}`,
                type: 'Aniqlanmagan',
                consumption: '0.0',
                status: 'online',
                uptime: '0s'
            };
            setDevices(prev => [...prev, newDevice]);
            showNotification("Yangi qurilma muvaffaqiyatli qo'shildi", "success");
        }, 1500);
    };

    const totalConsumption = devices
        .filter(d => d.status === 'online')
        .reduce((sum, d) => sum + parseFloat(d.consumption), 0)
        .toFixed(1);

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        QURILMALAR<span className="text-tertiary">.fiz</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Faol iste'mol nuqtalari va rele nazorati</p>
                </div>
                <div className="flex gap-6 items-end">
                    <div className="bg-primary text-primary-fixed p-4 border-4 border-primary neo-shadow flex gap-8">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase opacity-60">Jami yuklama</p>
                            <p className="font-display font-black text-2xl">{totalConsumption} kVt</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase opacity-60">Faol relelar</p>
                            <p className="font-display font-black text-2xl">{devices.filter(d => d.status === 'online').length} / {devices.length}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleAddDevice}
                        className="p-5 border-4 border-primary bg-neon-active text-primary neo-shadow neo-brutal-btn hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus size={32} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {devices.map(device => (
                    <DeviceCard key={device.id} device={device} onToggle={handleToggle} />
                ))}
            </div>
        </div>
    );
};

export default Devices;
