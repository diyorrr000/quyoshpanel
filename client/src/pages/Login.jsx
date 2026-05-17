import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, ShieldCheck } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-surface border-4 border-primary p-8 neo-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sun size={120} />
                </div>

                <header className="mb-8">
                    <h1 className="font-headline font-black text-4xl italic tracking-tighter text-primary">SOLAR_OS</h1>
                    <p className="font-headline font-bold text-[10px] uppercase opacity-60">Security Authentication Required</p>
                </header>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-headline font-black text-xs uppercase">Node Identifier / Email</label>
                        <input
                            type="text"
                            className="w-full bg-surface-container border-2 border-primary p-4 font-body focus:ring-0 focus:border-tertiary outline-none"
                            placeholder="operator@solar.io"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="font-headline font-black text-xs uppercase">Secret Token / Password</label>
                            <Link to="/forgot" className="text-[10px] font-black uppercase text-tertiary hover:underline">Lost Token?</Link>
                        </div>
                        <input
                            type="password"
                            className="w-full bg-surface-container border-2 border-primary p-4 font-body focus:ring-0 focus:border-tertiary outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-8">
                        <input type="checkbox" className="w-4 h-4 border-2 border-primary text-primary focus:ring-0" />
                        <span className="font-headline font-bold text-[10px] uppercase">Persistent Session</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-fixed py-5 border-4 border-primary font-headline font-black uppercase tracking-widest neo-brutal-btn flex items-center justify-center gap-3"
                    >
                        <ShieldCheck size={20} />
                        Authorize_Access
                    </button>
                </form>

                <footer className="mt-8 text-center border-t-2 border-primary pt-6">
                    <p className="font-headline font-bold text-[10px] uppercase opacity-60">
                        No Authorization? <Link to="/register" className="text-secondary hover:underline">Request Access</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
