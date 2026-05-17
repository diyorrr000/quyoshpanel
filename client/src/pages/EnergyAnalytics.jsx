import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { TrendingUp, FileDown, Calendar, Database } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const EnergyAnalytics = () => {
    const { t } = useTranslation();

    const chartData = {
        labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
        datasets: [
            {
                label: 'Ishlab chiqarilgan (kVt)',
                data: [65, 78, 92, 85, 70, 45, 30],
                borderColor: '#1A1A1A',
                backgroundColor: '#39ff14',
                fill: true,
                tension: 0,
                borderWidth: 4,
                pointRadius: 6,
                pointBackgroundColor: '#1A1A1A',
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { family: 'Space Grotesk', weight: 'bold', size: 12 } }
            },
        },
        scales: {
            y: { grid: { borderDash: [5, 5], color: '#d0cbc3' }, ticks: { font: { weight: 'bold' } } },
            x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } }
        }
    };

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="font-display font-black text-6xl uppercase tracking-tighter leading-none text-primary">
                        ANALYTICS_CORE<span className="text-tertiary">.log</span>
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Energiya ishlab chiqarish va iste'mol statistikasi</p>
                </div>
                <button className="flex items-center gap-3 px-6 py-3 border-4 border-primary bg-tertiary text-primary font-headline font-black uppercase text-sm neo-shadow-sm neo-brutal-btn">
                    <FileDown size={20} />
                    PDF_EKSPORT
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-surface border-4 border-primary p-8 neo-shadow h-[500px]">
                    <div className="flex justify-between items-start mb-8">
                        <h3 className="font-headline font-black text-2xl uppercase tracking-widest italic flex items-center gap-3">
                            <TrendingUp size={24} className="text-tertiary" />
                            Haftalik samaradorlik grafigi
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-black bg-primary-container px-3 py-1 border-2 border-primary">
                            <Calendar size={14} />
                            <span>MAY 10 - 16, 2024</span>
                        </div>
                    </div>
                    <div className="h-[380px]">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-surface border-4 border-primary p-6 neo-shadow">
                        <div className="flex items-center gap-3 mb-6 border-b-2 border-primary pb-4">
                            <Database size={24} className="text-secondary" />
                            <h3 className="font-headline font-black text-xl uppercase">Tizim Ma'lumotlari</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: "Jami hosil bo'ldi", value: '422.5 kVt', trend: '+14%', color: 'text-tertiary' },
                                { label: "O'rtacha samaradorlik", value: '92.4%', trend: '-2%', color: 'text-secondary' },
                                { label: 'Tejalgan CO2', value: '1.2 tonna', trend: '+5%', color: 'text-primary' },
                                { label: 'Tizim ish vaqti', value: '99.9%', trend: 'STABIL', color: 'text-tertiary' }
                            ].map(item => (
                                <div key={item.label} className="group">
                                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">{item.label}</p>
                                    <div className="flex justify-between items-end">
                                        <span className="font-display font-black text-2xl">{item.value}</span>
                                        <span className={`text-xs font-black ${item.color}`}>{item.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary text-primary-fixed border-4 border-primary p-6 neo-shadow">
                        <h4 className="font-headline font-black text-lg uppercase mb-4 tracking-tighter">Optimal yuklama vaqti</h4>
                        <p className="text-[10px] font-bold opacity-70 leading-relaxed uppercase">
                            Oxirgi 7 kunlik tahlillar shuni ko'rsatadiki, soat 10:30 va 16:00 oralig'ida tizim uzluksiz va yuqori quvvat bilan ishlaydi.
                        </p>
                        <div className="mt-4 p-2 border-2 border-primary-fixed bg-surface text-primary text-center font-headline font-black text-xs uppercase">
                            Keyingi diagnostika: 24 soatdan so'ng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyAnalytics;
