<script setup>
import VJson from "./VJson"


defineProps({
    data: {}
})
</script>

<template>

<div class="my-7 md:my-12 mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl bg-white overflow-hidden sm:rounded-lg shadow-md shadow-fuchsia-500 border-t-4 border-fuchsia-700">
    <div class="flex flex-wrap">
        <img class="h-40" :src="data.flickr_images[0]" alt="Photo of the roadster">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ data.name }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {{ data.id }}
            </p>
        </div>
    </div>
    <div class="border-t border-gray-200 bg-black">
        <VJson :json="data" />
    </div>
</div>

</template>