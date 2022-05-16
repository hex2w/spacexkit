import { h } from "vue"


export default {
    setup() { return _ => 
        h("div", { class: "text-center py-5 text-4xl text-red-400" }, "Not Found")
    }
}
