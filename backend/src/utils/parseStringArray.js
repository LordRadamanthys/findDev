module.exports = function parseStringAsArray(arrayAsString) {
    if (!arrayAsString) {
        return arrayAsString
    } else {
        return arrayAsString.split(",").map(tech => tech.toLowerCase().trim())
    }
}