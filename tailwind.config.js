/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        coal: '#0a0a0c',
        panel: '#0d0d10',
        raise: '#121218',
        crimson: '#c1121f',
        crimdeep: '#7a0c13',
        gold: '#d4af37',
        goldbright: '#f0d060',
        goldim: '#8a6d2f',
        bone: '#f4f2ee',
        mute: '#9b978e',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '76rem',
      },
    },
  },
  plugins: [],
};
