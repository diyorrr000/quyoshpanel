import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen bg-background grid-bg flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-surface border-4 border-primary p-8 neo-shadow relative overflow-hidden">
                <header className="mb-8">
                    <h1 className="font-headline font-black text-4xl italic tracking-tighter text-primary">SOLAR_OS</h1>
                    <p className="font-headline font-bold text-[10px] uppercase opacity-60">System Operator Registration</p>
                </header>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-headline font-black text-xs uppercase">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-surface-container border-2 border-primary p-4 font-body focus:ring-0 focus:border-tertiary outline-none"
                            placeholder="JONATHAN DOE"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-headline font-black text-xs uppercase">Operator Email</label>
                        <input
                            type="email"
                            className="w-full bg-surface-container border-2 border-primary p-4 font-body focus:ring-0 focus:border-tertiary outline-none"
                            placeholder="operator@solar.io"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-headline font-black text-xs uppercase">Create Secret Token</label>
                        <input
                            type="password"
                            className="w-full bg-surface-container border-2 border-primary p-4 font-body focus:ring-0 focus:border-tertiary outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="p-4 bg-secondary-container border-2 border-primary">
                        <p className="text-[10px] font-black uppercase text-secondary flex items-center gap-2">
                            <ShieldAlert size={14} /> Warning: Administrator approval required for all new operators.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-tertiary text-surface py-5 border-4 border-primary font-headline font-black uppercase tracking-widest neo-brutal-btn"
                    >
                        Submit_Request
                    </button>
                </form>

                <footer className="mt-8 text-center border-t-2 border-primary pt-6">
                    <p className="font-headline font-bold text-[10px] uppercase opacity-60">
                        Already registered? <Link to="/login" className="text-primary hover:underline">Authorize Here</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
