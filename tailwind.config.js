/** @type {import('tailwindcss').TailwindConfig} */
module.exports = {
    mode: 'jit',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
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
