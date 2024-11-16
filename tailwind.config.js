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
        secondary: 'var(--secondary)'
      }
    }
  },
  plugins: []
};
