/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                // primary: "#673AB7",
                // secondary: "#FFC107",

                primary: "#009688",
                secondary: "#F8FAE5",
                tertiary: "#B19470",
                quaternary: "#76453B",
            },
        },
    },
    plugins: [],
};
