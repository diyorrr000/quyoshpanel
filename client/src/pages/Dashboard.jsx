import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Battery, Sun, TrendingUp, AlertCircle, Play } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();
    const [period, setPeriod] = useState('KUN');

    const handleDiagnostic = () => {
        showNotification("Tizim diagnostikasi boshlandi...", "info");
        setTimeout(() => {
            showNotification("Diagnostika muvaffaqiyatli yakunlandi. Barcha tizimlar barqaror.", "success");
        }, 2000);
    };

    // Chart Data based on period
    const chartDataMap = {
        'KUN': {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            data: [0, 0, 15, 42, 38, 12, 0]
        },
        'HAFTA': {
            labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
            data: [35, 42, 38, 45, 40, 28, 30]
        },
        'OY': {
            labels: ['Hafta 1', 'Hafta 2', 'Hafta 3', 'Hafta 4'],
            data: [210, 245, 198, 260]
        }
    };

    const data = {
        labels: chartDataMap[period].labels,
        datasets: [
            {
                fill: true,
                label: "Energiya (kVt)",
                data: chartDataMap[period].data,
                borderColor: '#000',
                borderWidth: 4,
                backgroundColor: 'rgba(255, 204, 0, 0.6)', // Tertiary color with alpha
                tension: 0, // Brutalist zero-tension
                pointBackgroundColor: '#000',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#000',
                titleFont: { family: 'Space Grotesk', weight: 'bold' },
                bodyFont: { family: 'Inter', weight: 'bold' },
                padding: 12,
                cornerRadius: 0,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(0,0,0,0.1)',
                    lineWidth: 2
                },
                ticks: {
                    font: { family: 'Space Grotesk', weight: '900', size: 10 },
                    color: '#000'
                }
            },
            y: {
                grid: {
                    color: 'rgba(0,0,0,0.1)',
                    lineWidth: 2
                },
                ticks: {
                    font: { family: 'Space Grotesk', weight: '900', size: 10 },
                    color: '#000'
                }
            }
        },
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="font-display font-black text-7xl uppercase tracking-tighter leading-none text-primary">
                        TAHLIL TIZIMI
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Real vaqt rejimida energiya monitoringi va tizim holati</p>
                </div>
                <button
                    onClick={handleDiagnostic}
                    className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-neon-active text-primary font-headline font-black uppercase text-sm neo-shadow neo-brutal-btn"
                >
                    <Play size={20} fill="currentColor" />
                    Diagnostikani boshlash
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Bugungi ishlab chiqarish', value: '42.8 kVt', icon: Sun, color: 'text-tertiary' },
                    { label: 'Joriy iste\'mol', value: '12.4 kVt', icon: Zap, color: 'text-primary' },
                    { label: 'Batareya holati', value: '88%', icon: Battery, color: 'text-neon-active' },
                    { label: 'Tizim samaradorligi', value: '96.2%', icon: TrendingUp, color: 'text-secondary' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface border-4 border-primary p-8 neo-shadow group hover:bg-surface-container transition-colors"
                    >
                        <stat.icon className={`${stat.color} mb-6`} size={32} />
                        <p className="text-[10px] font-black uppercase opacity-60 mb-1">{stat.label}</p>
                        <h3 className="font-display font-black text-4xl">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-surface border-4 border-primary p-8 neo-shadow">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="font-headline font-black text-2xl uppercase italic">Energiya Grafigi</h3>
                        <div className="flex gap-4">
                            {['KUN', 'HAFTA', 'OY'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => {
                                        setPeriod(p);
                                        showNotification(`${p}lik ma'lumotlar yuklanmoqda...`, "info");
                                    }}
                                    className={`px-4 py-1 border-2 border-primary font-headline font-black text-[10px] transition-all ${period === p ? 'bg-primary text-surface' : 'hover:bg-primary-container'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[400px] relative">
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className="bg-primary text-surface p-8 border-4 border-primary neo-shadow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-8 text-secondary">
                            <AlertCircle size={40} strokeWidth={3} />
                            <h3 className="font-display font-black text-3xl uppercase italic leading-none">Tizim Ogohlantirishlari</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                "Inverter #04 harorati me'yordan yuqori",
                                "Panel #12 optimal burchakda emas",
                                "Batareya quvvati 20% dan past"
                            ].map((msg, i) => (
                                <div key={i} className="flex gap-4 items-start pb-4 border-b border-surface/20">
                                    <span className="font-display font-black text-xl text-tertiary">0{i + 1}</span>
                                    <p className="font-headline font-bold text-xs uppercase leading-tight">{msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => showNotification("Barcha xabarlar o'chirildi", "success")}
                        className="w-full mt-12 py-4 bg-surface text-primary border-4 border-surface hover:bg-neon-active hover:border-primary transition-all font-headline font-black uppercase text-sm neo-shadow-sm"
                    >
                        Barchasini tozalash
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
