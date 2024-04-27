import reactRefresh from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    server: {
        host: "localhost",
        port: 3000,
        open: true,
    },
    build: {
        outDir: "build",
    },
    plugins: [
        reactRefresh(),
        svgrPlugin({
        svgrOptions: {
            icon: true,
            // ...svgr options (https://react-svgr.com/docs/options/)
        },
        }),
    ],
    define: {
        __APP_VERSION__: JSON.stringify("v1.0.0"),
    },
    resolve: {
        alias: [
        {
            find: "@",
            replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        ],
    },
});
