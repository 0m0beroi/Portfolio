/******** Tailwind Config ********/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{json,md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#3B82F6'
        },
        dark: {
          900: '#0f172a'
        }
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(-6px)' }, '50%': { transform: 'translateY(6px)' } },
        toastIn: { '0%': { opacity:0, transform:'translateY(6px) scale(.95)' }, '100%': { opacity:1, transform:'translateY(0) scale(1)' } },
        toastOut: { '0%': { opacity:1, transform:'translateY(0) scale(1)' }, '100%': { opacity:0, transform:'translateY(-4px) scale(.95)' } }
      },
      animation: {
        'fade-in': 'fadeIn .6s ease forwards',
        'slide-up': 'slideUp .6s ease forwards',
        'float-slow': 'float 8s ease-in-out infinite',
        'toast-in': 'toastIn .32s ease forwards',
        'toast-out': 'toastOut .28s ease forwards'
      }
    }
  },
  plugins: []
};