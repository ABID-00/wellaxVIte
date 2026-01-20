module.exports = {
  plugins: [
    require('tailwindcss/nesting'), // ✅ MUST be first
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
