// Converts snake_case to Proper Case
export const toProperCase = str => str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase()).replaceAll("_", " ")


// Decide if a string is a valid link
export const isLink = str => {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    return regex.test(str)
}
