import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-72 min-h-screen bg-background grid-bg overflow-x-hidden transition-colors duration-300">
                <TopBar />
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
