process.env.NODE_ENV = 'test';
const expect = require("chai").expect;
const db = require("../js/db");
const util = require("../js/util");
const validation = require("../routes/base/validation");

describe('db', function () {
  describe('connectDb', function () {
    it('normal connection', async () => {
      expect(await db.connectDb()).to.equal(true);
      await db.disconnectDb();
    });
    it('test connection', async () => {
      expect(await db.connectDb(true)).to.equal(true);
      await db.dropDb();
    });
  });

  describe('addItem', function () {
    it('add an item to the DB', async () => {
      let item = new Object();
      item.name = "coffee beans";
      item.count = "8";
      item.tags = ["food", "brown"];
      await db.addItem(item);
      let resp = (await db.getItemsList(new Object()))[0];
      expect(resp.name).to.equal(item.name);
      expect(resp.count).to.equal(parseInt(item.count));
      expect(resp.tags).to.eql(item.tags.sort());
    })
  });

  describe('updateItem', function () {
    it('update an item in the DB', async () => {
      let updateObj = new Object();
      updateObj.oldName = "coffee beans";
      updateObj.newName = "arabica beans";
      updateObj.count = "10";
      updateObj.addTagList = ["plant", "coffee"];
      updateObj.removeTagList = ["food"];
      await db.updateItem(updateObj);
      let resp = (await db.getItemsList(new Object()))[0];
      expect(resp.name).to.equal(updateObj.newName);
      expect(resp.count).to.equal(parseInt(updateObj.count));
      expect(resp.tags).to.eql(["brown", "coffee", "plant"]);
    })
  });

  describe('containsItem', function () {
    it('check if an item exists', async () => {
      expect(await db.containsItem("arabica beans")).to.equal(true);
    })
  })

  describe('getItemList', function () {
    it('filter search results from DB query', async () => {
      // Add another item
      let item = new Object();
      item.name = "rose";
      item.count = "7";
      item.tags = ["plant", "red"];
      await db.addItem(item);
      // Query 1
      let params1 = new Object();
      params1.filterName = "arabica beans";
      params1.filterCount = "10";
      let resp = await db.getItemsList(params1);
      expect(resp.length).to.equal(1);
      // Query 2
      let params2 = new Object();
      params2.filterTags = "red, brown";
      params2.filterTagsList = util.parseListString(params2.filterTags);
      resp = await db.getItemsList(params2);
      expect(resp.length).to.equal(2);
    });
  });

  describe('deleteItem', function () {
    it('delete an item', async () => {
      let params = new Object();
      params.name = "rose";
      await db.deleteItem(params);
      let resp = (await db.getItemsList(new Object()));
      expect(resp.length).to.equal(1);
      await db.dropDb();
    });
  });
});

describe('validation', function () {
  describe('areTagsAlphanumeric', function () {
    it('tags parameter validation', async () => {
      validStrings = ["", "1, 2,3", "feifjeoifje,232ijr90jf, 2108ejfjdf    "];
      invalidStrings = ["?", "one, two, three-", ","];
      for (const str of validStrings) {
        tagList = util.parseListString(str);
        expect(validation.areTagsAlphanumeric(tagList)).to.equal(true);
      }
      for (const str of invalidStrings) {
        tagList = util.parseListString(str);
        expect(validation.areTagsAlphanumeric(tagList)).to.equal(false);
      }
    });
  });
});