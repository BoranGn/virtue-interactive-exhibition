import {defineConfig} from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://10.34.64.208:7070",
                changeOrigin: true
            },
            "/media": {
                target: "http://10.34.64.208:9090",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/media/, "")
            }
        }
    }
});