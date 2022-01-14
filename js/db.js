/** db.js: interface for interacting with the database */

const logs = require("./logs");
const mongoose = require('mongoose');
const dbcreds = require('../config/dbcreds');

// Schema for all entries in the inventory system
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    count: Number,
    tags: [String]
})
const Item = new mongoose.model('Item', itemSchema);

async function connectDb(test = false) {
    try {
        if (test) await mongoose.connect(dbcreds.testUri);
        else await mongoose.connect(dbcreds.uri);
    }
    catch (err) {
        logs.log(err);
        return false;
    }
    return true;
}

async function disconnectDb() {
    await mongoose.disconnect();
}

async function dropDb() {
    await Item.deleteMany();
}

async function containsItem(name) {
    return (await Item.countDocuments({ name: name }).exec()) > 0;
}

async function getItemsList(params) {
    logs.log('db.getItemsList', params);
    let query = {};
    if (params.filterName) query.name = params.filterName;
    if (params.filterCount) query.count = parseInt(params.filterCount);
    if (params.filterTags) query.tags = { "$in": params.filterTagsList };
    return await Item.find(query).sort('name').exec();
}

async function addItem(params) {
    logs.log('db.addItem', params);
    let newItem = new Item({
        name: params.name,
        count: params.count,
        tags: params.tags.sort()
    });
    await newItem.save();
}

async function updateItem(params) {
    logs.log('db.updateItem', params);
    let item = await Item.findOne({ name: params.oldName });
    if (params.newName) item.name = params.newName;
    if (params.count) item.count = params.count;

    let tagSet = new Set(item.tags);
    for (const tag of params.removeTagList) tagSet.delete(tag);
    for (const tag of params.addTagList) tagSet.add(tag);
    item.tags = Array.from(tagSet).sort();

    await item.save();
}

async function deleteItem(params) {
    logs.log('db.deleteItem', params);
    await Item.deleteOne({ name: params.name });
}

module.exports = { connectDb, disconnectDb, dropDb, getItemsList, containsItem, updateItem, deleteItem, addItem };