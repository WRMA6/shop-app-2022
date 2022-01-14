const express = require("express");
const router = express.Router();
const db = require("../../js/db");
const validation = require("./validation");

// Returns url query string for given filter parameters
function getFilterQuery(obj) {
    filters = new Object();
    if (obj.filterName) filters.filterName = obj.filterName;
    if (obj.filterCount) filters.filterCount = obj.filterCount;
    if (obj.filterTags) filters.filterTags = obj.filterTags;
    queryString = new URLSearchParams(filters).toString();
    if (queryString == "") return "";
    else return "?" + queryString;
}

function wrapError(res, responseStatus, errorCode = 400) {
    return res.status(errorCode).json({ error: responseStatus });
}

router.get('/', async (req, res) => {
    [ok, resp] = validation.processGet(req.query);
    if (!ok) return wrapError(res, resp);
    res.render('index.ejs', { itemList: await db.getItemsList(resp), params: req.query });
});

router.post('/create', async (req, res) => {
    [ok, resp] = await validation.processCreate(req.body);
    if (!ok) return wrapError(res, resp);
    await db.addItem(resp);
    return res.redirect('/' + getFilterQuery(req.body));
});

router.post('/update', async (req, res) => {
    [ok, resp] = await validation.processUpdate(req.body);
    if (!ok) return wrapError(res, resp);
    await db.updateItem(resp);
    return res.redirect('/' + getFilterQuery(req.body));
});

router.post('/delete', async (req, res) => {
    [ok, resp] = await validation.processDelete(req.body);
    if (!ok) return wrapError(res, resp);
    await db.deleteItem(resp);
    return res.redirect('/' + getFilterQuery(req.body));
});

module.exports = router;