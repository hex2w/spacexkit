<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const routes = useRouter().getRoutes()
</script>

<template>
  <nav class="m-2 flex flex-wrap justify-center space-x-2 text-emerald-300 font-semibold text-2xl md:text-lg">
    <router-link
      class="text-teal-400 no-underline"
      v-for="r in routes"
      :key="r.path"
      :to="r.path">{{ r.name }}</router-link>
  </nav>

  <div class="container m-auto text-white">
    <router-view :key="route.path + route.query.page" />
    <footer class="pb-10 flex justify-center items-center my-5 md:my-7">
      <h1 class="text-lg md:text-xl text-cyan-400 font-mono font-bold">Space<span class="text-orange-400">X</span>Kit</h1>&nbsp;
      <p class="font-mono">2021-{{ new Date().getUTCFullYear() }}</p>
    </footer>
  </div>
</template>
