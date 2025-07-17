const express = require("express");
const { getList, getSummary } = require("../controllers/List");
const router = express.Router();

router.get("/list", getList);
router.get("/summary", getSummary);
module.exports = router;
