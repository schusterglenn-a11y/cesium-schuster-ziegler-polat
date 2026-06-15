import { defineConfig } from "vite";
import cesium from "vite-plugin-cesium";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/cesium-schuster-ziegler-polat/' : '/',
  // vite-plugin-cesium copies Cesium's static assets (Assets, Widgets, Workers,
  // ThirdParty), sets CESIUM_BASE_URL, and injects widgets.css automatically.
  plugins: [cesium()],
});
