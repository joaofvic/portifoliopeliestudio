import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,ts}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        bone: 'rgb(var(--color-bone) / <alpha-value>)',
        terracotta: {
          DEFAULT: 'rgb(var(--color-terracotta) / <alpha-value>)',
          light: 'rgb(var(--color-terracotta-light) / <alpha-value>)',
          dark: 'rgb(var(--color-terracotta-dark) / <alpha-value>)',
        },
        sage: {
          DEFAULT: 'rgb(var(--color-sage) / <alpha-value>)',
          light: 'rgb(var(--color-sage-light) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-host)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(3rem, 12vw, 14rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        hero: ['clamp(2.5rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        section: ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
