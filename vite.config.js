import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@context": path.resolve(__dirname, "src/context"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  build: {
    minify: mode === "production",
    sourcemap: mode !== "production",
  },
  server: {
    open: true,
  },
}));
