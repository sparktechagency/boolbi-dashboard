import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "192.168.10.20",
    // host: "10.10.7.47",
    port: 3003,
  },
});
