<script setup>
import VJson from "./VJson"


defineProps({
    data: {}
})
</script>

<template>

<div class="border-t-4 border-sky-400 my-12 md:my-12 mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl bg-white shadow-md shadow-sky-400 overflow-hidden sm:rounded-lg">
    <div class="flex flex-wrap">
        <div v-if="data.image || data.images"><img class="h-40" :src="data.image || Object.values(data.images)[0]" alt="Image"></div>
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ data.name || data.serial || data.title }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {{ data.id }}
            </p>
            <p class="text-lg font-bold text-emerald-400 uppercase" v-if="data.upcoming">Upcoming</p>
            <span v-else-if="data.success === true || data.success === false">
                <p class="text-lg font-bold" :class="{ 'text-green-400': data.success, 'text-red-400': !data.success }">
                    {{ data.success ? "Successfull" : "Unsuccessfull" }}
                </p>
            </span>
        </div>
    </div>
    <div class="border-t border-gray-400 bg-black overflow-y-auto max-h-96">
        <VJson :json="data" />
    </div>
</div>

</template>