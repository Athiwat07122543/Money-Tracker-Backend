const express = require("express");
const router = express.Router();
const { addIncome, getIncome } = require("../controllers/Income");

router.post("/income", addIncome);
router.get("/income", getIncome);
module.exports = router;
