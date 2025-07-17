const express = require("express");
const { addType, getType, deleteType } = require("../controllers/Type");
const router = express.Router();

router.post("/type", addType);
router.get("/type", getType)
router.delete(`/type/:id`, deleteType)
module.exports = router;
