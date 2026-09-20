import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        redline: '#e31b23',
        ink: '#17202a',
      },
      boxShadow: {
        soft: '0 16px 45px rgba(23, 32, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
