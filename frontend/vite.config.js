import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	define: {
		"import.meta.env.VITE_BASE_API_DEV": JSON.stringify(
			"//localhost:3030/api/"
		),
		"import.meta.env.VITE_BASE_API_PROD": JSON.stringify(
			"https://code-app-dszr.onrender.com/api/"
		),
		"import.meta.env.VITE_BASE_URL_DEV": JSON.stringify("//localhost:3030/"),
		"import.meta.env.VITE_BASE_URL_PROD": JSON.stringify(
			"https://code-app-dszr.onrender.com/"
		),
	},
});

// ********************************
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
