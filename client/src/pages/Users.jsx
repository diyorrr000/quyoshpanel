import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Shield, UserPlus, MoreVertical, Search, Trash2, Edit, X } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Users = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [users, setUsers] = useState([
        { id: 1, name: "Ali Valiyev", role: "Administrator", status: "Faol", email: "ali@solar.uz", lastActive: "Hoziroq" },
        { id: 2, name: "Olim Toshov", role: "Muhandis", status: "Faol", email: "olim@solar.uz", lastActive: "2 soat oldin" },
        { id: 3, name: "Zuhra Akramova", role: "Operator", status: "Oflayn", email: "zuhra@solar.uz", lastActive: "Kecha" },
        { id: 4, name: "Javohir Karimov", role: "Muhandis", status: "Faol", email: "javohir@solar.uz", lastActive: "15 daqiqa oldin" },
        { id: 5, name: "Malika Sobirova", role: "Operator", status: "Ta'tilda", email: "malika@solar.uz", lastActive: "3 kun oldin" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id) => {
        const user = users.find(u => u.id === id);
        if (confirm(`${user.name}ni o'chirishni tasdiqlaysizmi?`)) {
            setUsers(prev => prev.filter(u => u.id !== id));
            showNotification(`${user.name} tizimdan o'chirildi`, "error");
        }
    };

    const handleAddUser = () => {
        const name = prompt("Foydalanuvchi ismi:");
        const email = prompt("Email manzili:");
        if (name && email) {
            const newUser = {
                id: Date.now(),
                name,
                email,
                role: "Operator",
                status: "Faol",
                lastActive: "Hoziroq"
            };
            setUsers(prev => [newUser, ...prev]);
            showNotification("Yangi foydalanuvchi qo'shildi", "success");
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="font-display font-black text-7xl uppercase tracking-tighter leading-none text-primary">
                        FOYDALANUVCHILAR
                    </h2>
                    <p className="text-xs font-bold uppercase opacity-60 mt-2">Tizim foydalanuvchilari va ruxsatnomalar boshqaruvi</p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="flex items-center gap-3 px-8 py-4 border-4 border-primary bg-neon-active text-primary font-headline font-black uppercase text-sm neo-shadow neo-brutal-btn"
                >
                    <UserPlus size={20} />
                    Yangi foydalanuvchi
                </button>
            </header>

            <div className="bg-surface border-4 border-primary neo-shadow overflow-hidden">
                <div className="p-6 border-b-4 border-primary flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-container">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="FOYDALANUVCHINI QIDIRISH..."
                            className="w-full pl-12 pr-4 py-3 bg-surface border-2 border-primary font-headline font-bold text-xs uppercase focus:outline-none focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-primary text-surface uppercase font-headline font-black text-xs text-left">
                                <th className="p-6 border-b-2 border-primary">Foydalanuvchi</th>
                                <th className="p-6 border-b-2 border-primary">Roli</th>
                                <th className="p-6 border-b-2 border-primary">Holati</th>
                                <th className="p-6 border-b-2 border-primary">Oxirgi faollik</th>
                                <th className="p-6 border-b-2 border-primary text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="font-headline font-bold text-xs uppercase">
                            <AnimatePresence>
                                {filteredUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="border-b-2 border-primary hover:bg-surface-container transition-colors"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-tertiary-container border-2 border-primary flex items-center justify-center">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-black">{user.name}</p>
                                                    <p className="text-[10px] opacity-60 tracking-tighter">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6"><span className="flex items-center gap-2"><Shield size={14} className="text-secondary" /> {user.role}</span></td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 border border-primary ${user.status === 'Faol' ? 'bg-neon-active shadow-[0_0_8px_#39ff14]' : user.status === 'Oflayn' ? 'bg-gray-400' : 'bg-secondary'}`} />
                                                {user.status}
                                            </div>
                                        </td>
                                        <td className="p-6">{user.lastActive}</td>
                                        <td className="p-6">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => showNotification("Tahrirlash oynasi ochildi", "info")} className="p-2 border-2 border-primary hover:bg-primary hover:text-surface transition-all neo-brutal-btn"><Edit size={16} /></button>
                                                <button onClick={() => handleDelete(user.id)} className="p-2 border-2 border-primary hover:bg-secondary hover:text-surface transition-all neo-brutal-btn"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
