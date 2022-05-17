import { h, resolveComponent } from "vue"
import { useRoute } from "vue-router"
import Nav from "./components/Nav.vue"


const footer = h("footer", {
    class: "pb-10 my-5 md:my-7"
}, [
    h("div", { class: "flex justify-center items-center" }, [
        h("h1", {
            class: "text-lg md:text-xl text-cyan-400 font-mono font-bold",
        }, [
            "Space",
            h("span", { class: "text-orange-400"}, "X"),
            "Kit"
        ]),
        h("p", {
            class: "font-mono",
            innerHTML: `&copy; 2021-${new Date().getFullYear()}`
        }),
    ])
])


export default {
    setup() {
        const route = useRoute()

        return _ => [
            h(Nav),
            h("div", { class: "h-20" }),

            h("div", {
                class: "text-white"
            }, [
                h("h1", { class: "p-5 capitalize text-xl md:text-3xl" }, route.name && !`${route.name}`.startsWith("get-one") ? `${route.name}` : ""),

                h(resolveComponent("router-view"), {
                    key: route.path + route.query.page,
                }),
                footer,
            ]),
        ]
    }
}
