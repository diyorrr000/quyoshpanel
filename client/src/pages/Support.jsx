import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../context/NotificationProvider';

const Support = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        showNotification("Murojaat yuborilmoqda...", "info");

        setTimeout(() => {
            setLoading(false);
            showNotification("Murojaatingiz qabul qilindi. Tez orada javob beramiz.", "success");
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="space-y-12">
            <header>
                <h2 className="font-display font-black text-7xl uppercase tracking-tighter leading-none text-primary">
                    YORDAM MARKAZI
                </h2>
                <p className="text-xs font-bold uppercase opacity-60 mt-2">Texnik ko'mak va tizim bo'yicha murojaatlar</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-surface border-4 border-primary p-8 neo-shadow">
                        <h3 className="font-headline font-black text-2xl uppercase italic mb-8 border-b-2 border-primary pb-4">Aloqa Ma'lumotlari</h3>
                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: 'Elektron pochta', value: 'support@solaris.uz' },
                                { icon: Phone, label: 'Ishonch telefoni', value: '+998 71 200 00 00' },
                                { icon: Clock, label: 'Ish vaqti', value: '24 / 7 (Dam olishlarsiz)' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="p-3 bg-primary text-surface border-2 border-primary">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase opacity-60">{item.label}</p>
                                        <p className="font-headline font-black text-lg uppercase">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neon-active border-4 border-primary p-8 neo-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <CheckCircle2 size={32} className="text-primary" />
                            <h3 className="font-display font-black text-2xl uppercase">Tezkor Yordam</h3>
                        </div>
                        <p className="font-headline font-bold text-xs uppercase opacity-80 leading-relaxed">
                            O'rtacha javob berish vaqti 15 daqiqani tashkil etadi. Shoshilinch holatlarda ishonch telefoniga qo'ng'iroq qiling.
                        </p>
                    </div>
                </div>

                <div className="bg-surface border-4 border-primary p-8 neo-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <MessageSquare size={120} />
                    </div>

                    <h3 className="font-headline font-black text-2xl uppercase italic mb-8">Murojaat Yuborish</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase opacity-60">Ismingiz</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-4 bg-surface border-2 border-primary font-headline font-bold text-xs uppercase focus:outline-none focus:bg-surface-container"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase opacity-60">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-4 bg-surface border-2 border-primary font-headline font-bold text-xs uppercase focus:outline-none focus:bg-surface-container"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase opacity-60">Mavzu</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full p-4 bg-surface border-2 border-primary font-headline font-bold text-xs uppercase focus:outline-none focus:bg-surface-container"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase opacity-60">Xabar matni</label>
                            <textarea
                                rows="4"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full p-4 bg-surface border-2 border-primary font-headline font-bold text-xs uppercase focus:outline-none focus:bg-surface-container resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-primary text-surface font-headline font-black uppercase text-sm neo-brutal-btn flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            <Send size={20} />
                            Murojaatni yuborish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
