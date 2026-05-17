/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "primary-container": "var(--primary-container)",
                "surface": "var(--surface)",
                "background": "var(--background)",
                "on-background": "var(--on-background)",
                "secondary": "var(--secondary)",
                "tertiary": "var(--tertiary)",
                "neon-active": "var(--neon-active)",
                "surface-container": "var(--surface-container)",
                "on-primary-fixed": "var(--on-background)",
                "primary-fixed": "var(--primary-container)",
                "primary-fixed-dim": "var(--primary-container)",
            },
            borderRadius: {
                "DEFAULT": "0px",
                "lg": "0px",
                "xl": "0px",
                "full": "0.75rem"
            },
            fontFamily: {
                "headline": ["Space Grotesk", "sans-serif"],
                "display": ["Space Grotesk", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "label": ["Space Grotesk", "sans-serif"]
            }
        },
    },
    plugins: [],
}
