/** util.js: general utility functions */

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function isAlphanumeric(value) {
    return /^[0-9a-zA-Z]+$/.test(value);
}

function removeSpaces(str) {
    return str.replace(/\s+/g, '');
}

function parseListString(str) {
    if (str) str = removeSpaces(str);
    if (!str) return [];
    let items = [];
    for (const tag of str.split(",")) {
        items.push(tag);
    }
    return items;
}

module.exports = { isNumeric, isAlphanumeric, removeSpaces, parseListString };