import { h, resolveComponent } from "vue"
import {
    toProperCase,
    isLink,
} from "../../helpers"
import "./style.css"


/*
JSON types:
- string
- number
- boolean
- null
- object
- array
*/


export default {
    // undefined allows any type
    props: { json: undefined },

    setup(props) {
        const exceptions = [
            "rockets",
            "ships",
            "launches",
            "launchpads",
            "landpads",
            "capsules",
            "crew",
        ]

        const exceptions2 = [
            "rocket",
            "ship",
            "launchpad",
            "landpad",
            "payload",
            "capsule",
            "core",
        ]


        const convertVal = (key, val) => {
            if (key === "youtube_id") return convert(`https://www.youtube.com/watch?v=${val}`)

            else if ([...exceptions, ...exceptions2].includes(key)) {
                const parsedKey = exceptions2.includes(key)
                    ? key === "launch"
                        ? "launches"
                        : key + "s"
                    : key

                return Array.isArray(val)
                    ? h("ul", val.map(i =>
                        h("li", h(resolveComponent("router-link"), {
                            to: `/${parsedKey}/${i}`,
                            target: "_blank",
                    }, _ => i)))
                    )
                    : h(resolveComponent("router-link"), {
                        to: `/${parsedKey}/${val}`,
                        target: "_blank",
                    }, _ => val)
            }

            else return convert(val)
        }
    
        const convert = (data) => {
            if (typeof data === "string") {
                if (isLink(data))
                    return h("a", { href: data, target: "_blank" }, data)
                else
                    return h("p", { class: "string" }, data)
    
            } else if (typeof data === "number") {
                return h("span", { class: "number" }, data)
    
            } else if (typeof data === "boolean") {
                return h("span", {
                    class: `bool ${data ? "bool-true" : "bool-false"}`
                }, data ? "yes" : "no")
    
            } else if (data === null || data === []) {
                return h("span", { class: "null" }, "-")
    
            } else if (typeof data === "object") {
                if (Array.isArray(data)) {
                    return h("ul", { class: "array" }, data.map(
                        (item) => h("li", { class: "array-item" }, convert(item))
                    ))
                } else {
                    const result = []
    
                    for (const key in data) {
                        result.push(
                            h("div", {
                                class: "key-val-wrapper"
                            }, [
                                h("dt", {
                                    class: "key"
                                }, h("span", { class: "string" }, toProperCase(key))),
    
                                h("dd", {
                                    class: "val"
                                // avoid `Non-function value encountered for default slot`
                                // by wrapping the child in a function
                                }, convertVal(key, data[key]))
                            ])
                        )
                    }
    
                    return h("dl", { class: "dict" }, result)
                }
            }
        }

        return _ => h("div", { "data-vjson": "" }, convert(props.json)) }
}
