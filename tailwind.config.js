module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
        },
        fontFamily: {
            "sans": ["Whitney", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"]
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography")
    ],
}
