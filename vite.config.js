import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const BACKEND_URL = process.env.BACKEND_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true, // needed for virtual hosted sites
      },
    },
  },
});
