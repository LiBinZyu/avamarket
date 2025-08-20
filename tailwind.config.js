/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#F7FAFC',
        'sidebar-bg': '#F1F3F5',
        'icon-hint': '#9B9CAE',
        'secondary-font': '#616B7E',
        'primary-font': '#11142D',
        'LightBlue': '#E6E7F9',
        'NormalBlue': '#3879D3',
        'DifyBlue': '#193FB9',
      },
      borderRadius: {
        'page-container': '1.5rem',
        'card': '1rem',
        'modal': '1rem',
        'button': '0.625rem',
        'input': '0.75rem',
        'tag': '0.375rem',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'input-focus': '0 0 0 3px rgba(59, 130, 246, 0.2)',
      },
    },
  },
  plugins: [],
}
