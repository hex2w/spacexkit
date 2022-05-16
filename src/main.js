import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import App from "./App.js"
import "./style.css"


const paths = [
    "crew",
    "rockets",
    "ships",
    "launches",
    "history",
    "launchpads",
    "landpads",
    "roadster",
    "capsules",
    "payloads",
    "cores",
]

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    watchQuery: true,
    routes: [
        {
            path: "/",
            name: "home",
            component: _ => import("./components/Home.vue")
        },
        ...paths.map(route => { return {
            path: `/${route}`,
            name: route,
            component: _ => import("./components/Page.vue")
        }}),
        ...paths.map(route => { return {
            path: `/${route}/:id`,
            name: `get-one-${route}`,
            component: _ => import("./components/GetOne.vue")
        }}),
        {
            path: "/:path*",
            name: "404",
            component: _ => import("./components/404.js")
        },
    ]
})

const app = createApp(App)
app.use(router)
app.mount("#app")
