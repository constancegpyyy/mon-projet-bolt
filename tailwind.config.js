/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F8F6F1',    // Blanc cassé pour le fond
        primary: '#2C3E50',       // Bleu foncé pour le texte principal
        secondary: '#34495E',     // Bleu-gris pour le texte secondaire
        accent: '#FFD626',        // Jaune vif pour les accents
        highlight: '#EF5741',     // Rouge-orangé pour les surbrillances
        success: '#27AE60',       // Vert vif pour les succès
        info: '#3498DB',          // Bleu clair vif pour les informations
        warning: '#F1C40F',       // Jaune vif pour les avertissements
        error: '#E74C3C',         // Rouge vif pour les erreurs
        muted: '#95A5A6',         // Gris pour le texte atténué
        dark: '#1a1a1a',          // Fond sombre
        light: '#ffffff',         // Fond clair
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        lobster: ['"Lobster Two"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'vibrate': 'vibrate 0.3s linear',
        'typewriter': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        vibrate: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#FFD626' }
        }
      },
      backgroundImage: {
        'tech-pattern': 'radial-gradient(circle at 1px 1px, rgba(44, 62, 80, 0.15) 2px, transparent 0)',
      },
      backgroundSize: {
        'tech': '32px 32px'
      }
    },
  },
  plugins: [],
};