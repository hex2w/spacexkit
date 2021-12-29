<script setup>
defineProps({
    data: {}
})

const specials = [
    "id",
    "name",
    "flickr_images",
]

// Converts snake_case to Proper Case
const toProperCase = str => str.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase()).replaceAll("_", " ")
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
        <div class="border-t border-gray-200">
            <dl v-for="(item, name) in data" :key="name" >
            <div v-if="![null, ''].includes(item) && !specials.includes(name) && !(Array.isArray(item) && !(item.length > 0))">

                <div class="border-t border-gray-200 bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    {{ toProperCase(name) }}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul v-if="Array.isArray(item)">
                            <li v-for="(subItem, index) in item" :key="index">{{ subItem }}</li>
                        </ul>
                        <span v-else-if="['video', 'wikipedia'].includes(name)">
                            <a target="_blank" :href="item">{{ item }}</a>
                        </span>
                        <span v-else>
                        {{ item }}
                        </span>
                    </dd>
                </div>

            </div>
            </dl>
        </div>
    </div>
</template>