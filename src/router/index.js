import { createRouter, createWebHashHistory } from "vue-router"

let paths = [
  "capsules",
  "cores",
  "crew",
  "history",
  "landpads",
  "launches",
  "launchpads",
  "payloads",
  "roadster",
  "rockets",
  "ships",
]

paths.forEach((route, index) => { paths[index] = {
  path: `/${route}`,
  name: route.charAt(0).toUpperCase() + route.slice(1),
  component: _ => { return import("../components/Page.vue")}
}})

const routes = [
  {
    path: "/",
    name: "Home",
    component: _ => { return import("../components/Home.vue") }
  }
].concat(paths)

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  watchQuery: true,
  routes,
})

export default router