import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import "./styles.css"

createApp(App)
    .use(router)
    .provide("api", "https://api.spacexdata.com/v4")
    .mount('#app')
