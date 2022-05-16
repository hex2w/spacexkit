<script setup>
import { onMounted, ref } from "vue"
import { apiGet } from "../helpers/"
import logo from "../assets/logo.png"
import githubLogo from "../assets/github.svg"


const data = ref({})
const loading = ref(true)
const delayElapsed = ref(false)
const version = appVersion


onMounted(_ => {
    setTimeout(_ => { delayElapsed.value = true }, 200)

    apiGet("/launches/latest")
        .then( res => data.value = res )
        .then( _ => loading.value = false )
})
</script>

<template>

<div class="flex justify-center items-center my-5 md:my-7">

  <h1 class="text-xl md:text-4xl text-cyan-400 font-mono font-bold select-none">Space<span class="text-orange-400">X</span>Kit</h1>
  <img class="px-auto w-32 md:w-72" alt="logo" :src="logo" />

</div>

<p class="text-center pb-4 text-xl text-cyan-200 font-semibold">v{{ version }}</p>

<p class="text-center text-2xl max-w-5xl mx-auto">An website where you can browse SpaceX's launch, rocket, core, capsule, starlink, launchpad, roadster and landing pad data.</p>

<div class="text-center pt-6 text-xl">
    <p>This project is open source!</p>
    <a href="https://github.com/hex3928/spacexkit" target="_blank" class="bg-white rounded-md py-1 px-2 inline-flex gap-2 text-black mt-2 underline">
        Browse the source code  <img class="w-6" :src="githubLogo" />
    </a>
</div>

<div class="flex justify-center text-4xl font-semibold text-red-400" v-if="data.error">{{ data.error }}</div>

<div class="py-10 flex justify-center" v-if="(loading || !delayElapsed) && !data.error">
    <svg class="animate-spin -ml-1 mr-3 h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
</div>

<div v-if="!loading && delayElapsed && !data.error"
    class="p-5 text-center max-w-4xl mx-auto border-y border-white mt-5 lg:mt-10 pt-5 lg:pt-10"
>

    <h2>Latest Launch</h2>

    <p class="text-lg">{{ data.name }}</p>
    <p>{{ new Date(data.date_utc).toString() }}</p>
    <p class="text-lg font-bold text-emerald-400 uppercase" v-if="data.upcoming">Upcoming</p>
    <span v-else>
        <p class="text-lg font-bold p-3" :class="{ 'text-green-400': data.success, 'text-red-400': !data.success }">
            {{ data.success ? "Successfull" : "Unsuccessfull" }}
        </p>
        <p class="px-3" v-if="!data.success">
            Failures:
            <ul class="py-2">
                <li v-for="(failure, index) in data.failures" :key="index">
                    {{ index }} - {{ failure }}
                </li>
            </ul>
        </p>
    </span>
    <p class="px-3">{{ data.details }}</p>

</div>

<p class="pt-6 text-sm italic max-w-3xl mx-auto">We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Space Exploration Technologies Corp (SpaceX), or any of its subsidiaries or its affiliates. The names SpaceX as well as related names, marks, emblems and images are registered trademarks of their respective owners.</p>

</template>
