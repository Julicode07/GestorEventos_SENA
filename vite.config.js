import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@fonts": path.resolve(__dirname, "src/fonts"),
      "@context": path.resolve(__dirname, "src/context"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  build: {
    minify: mode === "production",
    cssCodeSplit: true,
    sourcemap: false,
  },
  server: {
    open: true,
  },
}));
