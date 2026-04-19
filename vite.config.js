import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "https://insta-motion-backend.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});