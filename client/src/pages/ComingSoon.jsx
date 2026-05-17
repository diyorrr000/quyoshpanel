import React from 'react';
import { Construction } from 'lucide-react';

const ComingSoon = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="bg-primary-container p-8 border-4 border-primary neo-shadow">
                <Construction size={64} className="text-primary animate-bounce" />
            </div>
            <div className="text-center">
                <h2 className="font-display font-black text-5xl uppercase tracking-tighter">{title}</h2>
                <p className="font-headline font-bold text-xs uppercase opacity-60 mt-2">Node is currently under development or maintenance</p>
            </div>
            <button className="bg-primary text-surface px-8 py-3 border-4 border-primary font-headline font-black uppercase neo-brutal-btn mt-8">
                Force_Update_Request
            </button>
        </div>
    );
};

export default ComingSoon;
