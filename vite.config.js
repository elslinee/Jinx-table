import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "JinxTable",
      fileName: (format) => `jinx-table.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-slot",
        "@tanstack/react-table",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "tailwind-merge",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@radix-ui/react-checkbox": "RadixCheckbox",
          "@radix-ui/react-dialog": "RadixDialog",
          "@radix-ui/react-slot": "RadixSlot",
          "@tanstack/react-table": "TanStackTable",
          "class-variance-authority": "CVA",
          clsx: "clsx",
          "lucide-react": "LucideReact",
          "tailwind-merge": "tailwindMerge",
        },
      },
    },
  },
});
