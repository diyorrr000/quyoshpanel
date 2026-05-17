import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'Medium');
    const [interfaceScale, setInterfaceScale] = useState(localStorage.getItem('interfaceScale') || '100%');
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'uz');

    // Theme effect
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'neon-mode');

        if (theme === 'auto') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else if (theme === 'neon') {
            root.classList.add('neon-mode');
        } else {
            root.classList.add(theme);
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // Scale effect
    useEffect(() => {
        const root = window.document.documentElement;
        const scaleValue = parseInt(interfaceScale) / 100;

        // Applying scale using CSS zoom (fastest for dashboard scaling)
        // For Firefox fallback, we could use transform scale + width/height adjustments, 
        // but zoom is preferred for maintaining layout flow in Chrome/Edge/Safari.
        root.style.zoom = scaleValue;

        localStorage.setItem('interfaceScale', interfaceScale);
    }, [interfaceScale]);

    // Font size effect
    useEffect(() => {
        const root = window.document.documentElement;
        const sizes = {
            'Small': '14px',
            'Medium': '16px',
            'Large': '18px',
            'Extra Large': '22px'
        };

        // We apply to body to not conflict with scale
        document.body.style.fontSize = sizes[fontSize] || '16px';
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    // Language sync
    useEffect(() => {
        localStorage.setItem('i18nextLng', language);
    }, [language]);

    return (
        <SettingsContext.Provider value={{
            theme, setTheme,
            fontSize, setFontSize,
            interfaceScale, setInterfaceScale,
            language, setLanguage
        }}>
            <div className={`app-wrapper ${theme === 'neon' ? 'neon-mode' : ''}`}>
                {children}
            </div>
        </SettingsContext.Provider>
    );
};
