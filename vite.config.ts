import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./dist/euler-angles-calculator",
  },
  base: "/apps/euler-angles-calculator/",
});
