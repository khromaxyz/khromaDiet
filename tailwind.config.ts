import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg900: 'var(--bg-900)',
        bg800: 'var(--bg-800)',
        bg700: 'var(--bg-700)',
        bg600: 'var(--bg-600)',
        bg500: 'var(--bg-500)',
        bg400: 'var(--bg-400)',
        lime: 'var(--accent-lime)',
        violet: 'var(--accent-violet)',
        cyan: 'var(--accent-cyan)',
        orange: 'var(--accent-orange)',
        red: 'var(--accent-red)',
        green: 'var(--accent-green)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textTertiary: 'var(--text-tertiary)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        lime: 'var(--shadow-lime)',
        violet: 'var(--shadow-violet)',
        cyan: 'var(--shadow-cyan)',
        card: 'var(--shadow-card)',
        cardHover: 'var(--shadow-card-hover)',
      },
    },
  },
  plugins: [],
};

export default config;
