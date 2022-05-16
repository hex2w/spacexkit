<script setup>
import { useRoute, useRouter } from "vue-router"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { ChevronDownIcon } from "@heroicons/vue/solid"


const route = useRoute()
const routes = useRouter().getRoutes()
    .filter(i => i.name !== "404" && !i.name.startsWith("get-one"))
    .map(i => {
        // Capitalize
        i.name = i.name[0].toUpperCase() + i.name.substring(1)
        return i
    })
</script>

<template>

<nav class="flex flex-row justify-center select-none gap-x-2 md:gap-x-4 bg-black bg-opacity-40 w-full fixed top-0 h-20">
    <router-link
        class="rounded-md text-gray-900 bg-cyan-400 h-min px-4 py-2 my-auto font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        v-for="r in routes.slice(0, 5)"
        :key="r.path"
        :to="r.path"
    >{{ r.name }}</router-link>

    <Menu as="div" class="relative inline-block text-left">
    <div class="group">
        <MenuButton
        class="inline-flex w-full rounded-md bg-white px-2 py-1 mt-5 font-medium group-hover:bg-opacity-30"
        >
            <ChevronDownIcon
                class="h-8 w-8 text-black group-hover:text-white"
                aria-hidden="true"
            />
        </MenuButton>
    </div>

    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
        <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-cyan-400 text-gray-900 font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
        <div class="px-1 py-1">
            <MenuItem
                v-for="r in routes.slice(5, routes.length)"
                :key="r.path">
            <router-link
                :to="r.path"
                :class="[
                    r.path === route.path ? 'text-gray-900' : 'text-gray-900',
                    'flex w-full items-center rounded-md px-2 py-2',
                ]"
            >
                <!--<EditIcon
                :active="active"
                class="mr-2 h-5 w-5 text-teal-400"
                aria-hidden="true"
                />-->
                {{ r.name }}
            </router-link>
            </MenuItem>
        </div>
        </MenuItems>
    </transition>
    </Menu>
</nav>

</template>

<style scoped>
.active { @apply bg-white }
</style>
