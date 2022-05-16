<script setup>
import { onMounted, ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { apiGet } from "../helpers"
import PageItem from "./PageItem.vue"
import Roadster from "./Roadster.vue"

const data = ref({})
const loading = ref(true)
const delayElapsed = ref(false)
const route = useRoute()
const router = useRouter()

const page = ref(route.query.page)
let query = { "page": parseInt(route.query.page) }

const itemsOnPage = computed(_ => (page.value * 10 - 9) + "-" + (page.value * 10 - 10 + data.value.docs.length))

function setPage(newValue) {
    page.value = newValue
    router.push({
        path: route.fullPath,
        query: { ...route.query, page: newValue }
    })
}

if (!route.query.page) router.replace({
    path: route.fullPath,
    query: { ...route.query, page: 1 }
})

function nextPage() { setPage(data.value.nextPage) }
function prevPage() { setPage(data.value.prevPage) }


onMounted(_ => {
    setTimeout(_ => { delayElapsed.value = true }, 200)

    apiGet(`${route.path}`, query)
        .then(res => data.value = res )
        .then(_ => loading.value = false)
        .then(_ => {
          // If the requested page is out of bounds
          if (page.value > data.value.totalPages) setPage(data.value.totalPages)
        })
})
</script>

<template>

<div class="flex justify-center text-4xl font-semibold text-red-400" v-if="data.error">{{ data.error }}</div>

<div class="py-10 flex justify-center" v-if="(loading || !delayElapsed) && !data.error">
    <svg class="animate-spin -ml-1 mr-3 h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
</div>

<div v-if="!loading && delayElapsed && !data.error">

    <div v-if="route.path === '/roadster'">
        <Roadster :data="data" />
    </div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-2">
        <div class="p-0 md:p-4" v-for="(document, index) in data.docs" :key="index">
          <PageItem :data="document" />
        </div>

        <div v-if="data.totalPages != 1" class="mx-2 md:mx-5 p-2 md:p-4 lg:p-6 fixed bottom-0 font-semibold bg-white text-black rounded-t-2xl border-t-4 border-cyan-400 shadow-md shadow-cyan-400">
            <div class="mx-auto inline-flex flex-wrap space-x-6 max-w-xl md:max-w-2xl lg:max-w-3xl">
                <p v-if="!loading">
                   Page&nbsp;{{ data.page }}&nbsp;of&nbsp;{{ data.totalPages }},
                   {{ route.name }}&nbsp;{{ itemsOnPage }}
                </p>
                <button :disabled="!data.hasPrevPage" @click="prevPage()"
                    class="bg-cyan-500 rounded-full hover:bg-cyan-400 disabled:bg-slate-400">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button :disabled="!data.hasNextPage" @click="nextPage()"
                    class="ring ring-cyan-500 hover:ring-cyan-400 bg-cyan-500 rounded-full hover:bg-cyan-400 disabled:ring-slate-400 disabled:bg-slate-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    </div>

</div>

</template>
