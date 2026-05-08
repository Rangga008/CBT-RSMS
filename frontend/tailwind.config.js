/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
			colors: {
				sidebar: "#2b369e",
				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
				},
			},
			animation: {
				"fade-in": "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
			},
			keyframes: {
				fadeIn: {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [
		// @tailwindcss/forms,
		// @tailwindcss/typography
	],
};
