import React, { createContext, useContext, useState, useEffect } from 'react';

const RealTimeDataContext = createContext();

export const useRealTimeData = () => useContext(RealTimeDataContext);

export const RealTimeDataProvider = ({ children }) => {
    const [data, setData] = useState({
        totalHealth: 98.4,
        liveGridOutput: 14.2,
        ambientTemp: 28,
        activePanels: 48,
        totalPanels: 48,
        batteryLevel: 85,
        batteryTemp: 32,
        solarEfficiency: 94.2,
        panels: Array.from({ length: 48 }, (_, i) => ({
            id: 101 + i,
            efficiency: (Math.random() * (98 - 85) + 85).toFixed(1),
            voltage: (Math.random() * (25 - 23) + 23).toFixed(1),
            temp: (Math.random() * (35 - 25) + 25).toFixed(1),
            status: Math.random() > 0.1 ? 'online' : 'maintenance'
        }))
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                ...prev,
                liveGridOutput: +(prev.liveGridOutput + (Math.random() * 0.2 - 0.1)).toFixed(2),
                ambientTemp: +(prev.ambientTemp + (Math.random() * 0.1 - 0.05)).toFixed(1),
                batteryLevel: prev.batteryLevel < 100 ? +(prev.batteryLevel + 0.01).toFixed(2) : 100,
                panels: prev.panels.map(p => ({
                    ...p,
                    efficiency: +(+p.efficiency + (Math.random() * 0.4 - 0.2)).toFixed(1),
                    voltage: +(+p.voltage + (Math.random() * 0.2 - 0.1)).toFixed(1),
                }))
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <RealTimeDataContext.Provider value={data}>
            {children}
        </RealTimeDataContext.Provider>
    );
};
