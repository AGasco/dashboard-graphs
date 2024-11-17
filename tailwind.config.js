/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        backgroundAccent: 'var(--background-accent)',
        foreground: 'var(--foreground)',
        foregroundAccent: 'var(--foreground-accent)',
        primary: 'var(--primary)',
        primarySaturated: 'var(--primary-saturated)',
        secondary: 'var(--secondary)'
      },
      screens: {
        '3xl': '2560px'
      },
      maxWidth: {
        '3xl': '1600px'
      }
    }
  },
  plugins: []
};
