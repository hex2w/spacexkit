import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"


export default defineConfig({
    plugins: [vue()],
    define: {
        api: JSON.stringify("https://api.spacexdata.com/v4"),
        appVersion: JSON.stringify(process.env.npm_package_version),
    },
    base: "/spacexkit/",
    build: { outDir: "docs" }
})
