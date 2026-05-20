import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Filter, FileBarChart, PieChart, Activity, Check, Loader2 } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';

const Reports = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();
    const [downloading, setDownloading] = useState(null);

    const formatDate = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split('T')[0];
    };

    const reportList = [
        { id: 'REP-001', name: "Oylik Energiya Hisoboti - " + new Date().toLocaleString('uz-UZ', { month: 'long' }), type: "Tizim", date: formatDate(2), size: "2.4 MB" },
        { id: 'REP-002', name: "Panel Samaradorligi Tahlili", type: "Texnik", date: formatDate(4), size: "1.8 MB" },
        { id: 'REP-003', name: "Xarajatlar va Tejamkorlik", type: "Moliyaviy", date: formatDate(7), size: "0.9 MB" },
        { id: 'REP-004', name: "Xizmat Ko'rsatish Tarixi", type: "Logistika", date: formatDate(12), size: "3.1 MB" },
    ];

    const generateRealDownload = (name) => {
        const content = `QUYOSH_PANEL HISOBOTI: ${name}\nSana: ${new Date().toLocaleString()}\nHolati: Muvaffaqiyatli generatsiya qilindi\nTizim tuguni: 1A-42-CF\nIshlab chiqarilgan energiya: 1,242.4 kVt\nSamaradorlik: 94.2%`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownload = (id, name) => {
        setDownloading(id);
        showNotification(`${name} generatsiya qilinmoqda...`, "info");

        setTimeout(() => {
            setDownloading(null);
            generateRealDownload(name);
            showNotification(`${name} muvaffaqiyatli yuklandi`, "success");
        }, 1500);
    };

    const handleNewReport = () => {
        showNotification("Yangi oylik tahlil olinmoqda...", "info");
        setTimeout(() => {
            generateRealDownload("Tizim_Umumiy_Hisoboti");
            showNotification("Yangi hisobot tayyor va yuklandi", "success");
        }, 2000);
    };

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="font-display font-black text-7xl uppercase tracking-tighter leading-none text-primary">
                        HISOBOT MARKAZI
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Energiya ishlab chiqarish va tizim jurnallari hisoboti</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => showNotification("Filtrlash oynasi ochildi", "info")}
                        className="flex items-center gap-3 px-6 py-3 border-4 border-primary bg-surface neo-shadow-sm neo-brutal-btn font-headline font-black uppercase text-xs"
                    >
                        <Filter size={18} />
                        Filtrlash
                    </button>
                    <button
                        onClick={handleNewReport}
                        className="flex items-center gap-3 px-6 py-3 border-4 border-primary bg-primary text-surface neo-shadow neo-brutal-btn font-headline font-black uppercase text-xs"
                    >
                        <FileText size={18} />
                        Yangi hisobot yaratish
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Jami hisobotlar", value: reportList.length, icon: FileText, color: "text-tertiary" },
                    { label: "Oylik o'sish", value: "+12%", icon: Activity, color: "text-neon-active" },
                    { label: "Xotira hajmi", value: "124MB", icon: FileBarChart, color: "text-secondary" }
                ].map((stat, i) => (
                    <div key={i} className="bg-surface border-4 border-primary p-8 neo-shadow">
                        <stat.icon className={`${stat.color} mb-4`} size={32} />
                        <p className="text-[10px] font-black uppercase opacity-60">{stat.label}</p>
                        <h3 className="font-display font-black text-4xl">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-surface border-4 border-primary neo-shadow overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-surface font-headline font-black text-xs uppercase text-left">
                            <th className="p-6 border-b-2 border-primary">Hisobot nomi</th>
                            <th className="p-6 border-b-2 border-primary">Turi</th>
                            <th className="p-6 border-b-2 border-primary">Sana</th>
                            <th className="p-6 border-b-2 border-primary">Hajmi</th>
                            <th className="p-6 border-b-2 border-primary text-center">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="font-headline font-bold text-xs uppercase">
                        {reportList.map((report) => (
                            <tr key={report.id} className="border-b-2 border-primary hover:bg-surface-container transition-colors">
                                <td className="p-6 flex items-center gap-4">
                                    <FileText className="text-tertiary" size={20} />
                                    {report.name}
                                </td>
                                <td className="p-6">{report.type}</td>
                                <td className="p-6">{report.date}</td>
                                <td className="p-6">{report.size}</td>
                                <td className="p-6">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleDownload(report.id, report.name)}
                                            disabled={downloading === report.id}
                                            className={`p-2 border-2 border-primary transition-all ${downloading === report.id ? 'bg-neon-active' : 'hover:bg-neon-active'}`}
                                        >
                                            {downloading === report.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                        </button>
                                        <button
                                            onClick={() => showNotification("Tahlil grafigi yuklanmoqda...", "info")}
                                            className="p-2 border-2 border-primary hover:bg-secondary hover:text-surface transition-all"
                                        >
                                            <PieChart size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
