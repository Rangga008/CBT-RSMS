import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5173,
		host: true,
		proxy: {
			// Semua request /api diforward ke backend
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
			"/uploads": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: "../backend/public", // Build output masuk ke backend untuk serving static
		emptyOutDir: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["vue", "vue-router", "pinia"],
					ui: ["sweetalert2", "dompurify"],
				},
			},
		},
	},
});
