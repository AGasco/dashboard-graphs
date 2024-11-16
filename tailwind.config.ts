import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
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
      }
    }
  },
  plugins: []
} satisfies Config;
