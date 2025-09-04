import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      safelist: [
        'text-biru',
      ],
      colors: {
        biru: "#4F9CF9",
        kuning: "#FDCB02",
        hitam: "#000000",
        putih: "#ffffff",
        biruGelap: "#043873"
      }
    },
  },
  plugins: [
    scrollbar(), // ✅ pakai import, bukan require
  ],
  variants: {
    scrollbar: ['rounded'],
  },
}
