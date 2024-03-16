import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'max-2xl': {'max': '1535px'},
                'max-xl': {'max': '1279px'},
                'max-lg': {'max': '1023px'},
                'max-md': {'max': '767px'},
                'max-sm': {'max': '639px'},
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "night": "url('../public/night.webp')",
                "day": "url('../public/day.webp')"
            },
            backgroundColor: {
                "autocomplete": "background-color:transparent !important"
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                'card': '10px !important',

            },
            animation: {
                "slide": 'slide 4s ease-in-out infinite',
                "hover": 'hover 15s ease-in-out infinite',
                "fadeIn": 'fadeIn 1s ease-in-out forwards',
            },
            keyframes: {
                "slide": {
                    "0% , 100%": {"transform": 'translateX(-0.1%)'},
                    '50%': {"transform": 'translateX(0.1%)'}
                },
                "hover": {
                    "0% , 100%": {"transform": 'translateY(-10%)'},
                    "50%": {"transform": 'translateY(10%)'}
                },
                "fadeIn":{
                    "0%" : {"opacity":0,"scale":0.8},
                    "100%": {"opacity":1,"scale":1},

                }
            },

        },
    },
    plugins: [
        require("tailwindcss-animation-delay")
    ],
};
export default config;
