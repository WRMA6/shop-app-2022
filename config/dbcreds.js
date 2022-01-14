const user = "dbuser1";
const password = "shopapp2022";
const dbName = "inventoryDB";
const uri = `mongodb+srv://${user}:${password}@cluster0.tzoud.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const testdbName = "testInventoryDB";
const testUri = `mongodb+srv://${user}:${password}@cluster0.tzoud.mongodb.net/${testdbName}?retryWrites=true&w=majority`;

module.exports = { uri, testUri };