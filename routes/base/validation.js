/** base/validation.js: parameter processing and validation for the '/' route */

const util = require("../../js/util");
const db = require("../../js/db");

function getErrResp(msg) {
    return [false, msg];
}

function areTagsAlphanumeric(tagList) {
    for (const tag of tagList) {
        if (!util.isAlphanumeric(tag)) return false;
    }
    return true;
}

function processGet(params) {
    params.filterTagsList = util.parseListString(params.filterTags);
    return [true, params];
}

async function processCreate(params) {
    if (!params.name) {
        return getErrResp("Name cannot be empty.");
    }

    if (!util.isNumeric(params.count)) {
        return getErrResp("Enter an integer for the count.");
    }

    if (await db.containsItem(params.name)) {
        return getErrResp("Item already exists");
    }

    params.tags = util.parseListString(params.tags);
    if (!areTagsAlphanumeric(params.tags)) {
        return getErrResp("Tags must be alphanumeric");
    }

    return [true, params];
}

async function processUpdate(params) {
    if (!await db.containsItem(params.oldName)) {
        return getErrResp("The old name must correspond to an existing item.");
    }

    if (params.count && !util.isNumeric(params.count)) {
        return getErrResp("Count must be an integer.");
    }

    if (await db.containsItem(params.newName)) {
        return getErrResp("The new name already belongs to another item.");
    }

    params.addTagList = util.parseListString(params.addTags);
    if (!areTagsAlphanumeric(params.addTagList)) {
        return getErrResp("Tags must be alphanumeric.");
    }

    params.removeTagList = util.parseListString(params.removeTags);

    return [true, params];
}

async function processDelete(params) {
    if (!await db.containsItem(params.name)) {
        return getErrResp("Name must correspond to an existing item.");
    }

    return [true, params];
}

module.exports = { areTagsAlphanumeric, processGet, processCreate, processUpdate, processDelete };