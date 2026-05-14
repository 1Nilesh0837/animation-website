/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(260, 100%, 95%)',
          100: 'hsl(260, 100%, 90%)',
          200: 'hsl(260, 100%, 80%)',
          300: 'hsl(260, 100%, 70%)',
          400: 'hsl(260, 100%, 60%)',
          500: 'hsl(260, 100%, 50%)',
          600: 'hsl(260, 100%, 40%)',
          700: 'hsl(260, 100%, 30%)',
          800: 'hsl(260, 100%, 20%)',
          900: 'hsl(260, 100%, 10%)',
        },
        accent: {
          50: 'hsl(280, 100%, 95%)',
          100: 'hsl(280, 100%, 90%)',
          500: 'hsl(280, 100%, 50%)',
          900: 'hsl(280, 100%, 10%)',
        },
        dark: {
          bg: 'hsl(260, 20%, 8%)',
          surface: 'hsl(260, 20%, 12%)',
          card: 'hsl(260, 20%, 16%)',
          text: 'hsl(260, 10%, 95%)',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [],
}
