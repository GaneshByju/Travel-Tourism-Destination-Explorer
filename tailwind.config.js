/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#faf8f5',
          100: '#f5f0eb',
          200: '#e8ded4',
          300: '#d7c7b8',
          700: '#524339',
          800: '#3a2e26',
          900: '#231b15',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e5ece5',
          200: '#ccdacc',
          500: '#6b8e6b',
          600: '#537353',
          700: '#3d563d',
          800: '#2c3e2c',
          900: '#1e2b1e',
        },
        terracotta: {
          50: '#fdf6f2',
          100: '#faeae0',
          500: '#c8683f',
          600: '#ad502a',
          700: '#8c3d1d',
        }
      }
    },
  },
  plugins: [],
}
