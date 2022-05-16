<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { apiGet } from "../helpers/"
import PageItem from "./PageItem.vue"


const data = ref({})
const loading = ref(true)
const delayElapsed = ref(false)
const route = useRoute()
const id = route.params.id


onMounted(_ => {
    setTimeout(_ => { delayElapsed.value = true }, 200)

    apiGet(`/${route.name.replace("get-one-", "")}/${id}`)
        .then( res => data.value = res )
        .then( _ => loading.value = false )
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
<PageItem :data="data" />
</div>

</template>
