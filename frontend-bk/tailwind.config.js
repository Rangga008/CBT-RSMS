/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: { sans: ["Inter", "sans-serif"] },
			colors: {
				primary: {
					DEFAULT: "#1e40af",
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
				},
				bk: { DEFAULT: "#0f766e", light: "#14b8a6", dark: "#0d9488" },
			},
			animation: {
				"fade-in": "fadeIn 0.3s ease",
				"slide-up": "slideUp 0.3s ease",
			},
			keyframes: {
				fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
				slideUp: {
					from: { opacity: 0, transform: "translateY(12px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [import("@tailwindcss/forms")],
};
