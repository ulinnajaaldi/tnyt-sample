import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        start_url: "/",
        lang: "id-ID",
        orientation: "any",
        name: "TNYT - Ulinnaja",
        short_name: "TNYT",
        description:
          "The New York Times clone built with React and Tailwind CSS",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#dbdbdb",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "manifest/iPhone-14-Pro-Max-430x932.png",
            sizes: "430x932",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "manifest/Pixel-7-Pro-480x1040.png",
            sizes: "480x1040",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "manifest/iPad-mini-608x926.png",
            sizes: "608x926",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "manifest/Macbook-Air-1559x975.png",
            sizes: "1559x975",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
