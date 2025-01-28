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
    minify: mode === "production" ? "terser" : false,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // Separar React en su propio chunk
          router: ["react-router-dom"], // Separar React Router
          nextui: ["@nextui-org/react"], // Separar NextUI
          utils: ["lodash", "framer-motion"], // Utilitarios y animaciones
        },
      },
    },
    target: ["esnext"], // Indica que se debe compilar para los navegadores modernos
  },
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "@nextui-org/react"],
    exclude: ["@fortawesome/fontawesome-free"], // Si alguna no es crítica
  },
}));
