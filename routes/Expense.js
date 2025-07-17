const express = require("express");
const { addExpense, getExpense } = require("../controllers/Expense");
const router = express.Router();

router.post("/expense", addExpense);
router.get("/expense", getExpense);

module.exports = router;
