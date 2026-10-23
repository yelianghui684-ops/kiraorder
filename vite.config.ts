import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  // Served from a GitHub Pages project site: https://<owner>.github.io/kiraorder/
  // Change this string if the repository (and therefore the URL path) is renamed.
  base: "/kiraorder/",
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true },
  build: {
    target: "es2022",
    // The 3D intro (three.js + drei) stays in its own lazy-loaded chunk:
    // it is only fetched after the workspace renders, so its size is expected.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
