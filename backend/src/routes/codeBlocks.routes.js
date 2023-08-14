const express = require("express");
const { getAllCodeBlocks } = require("../controllers/codeBlocks.controller");
const router = express.Router();

router.get("/code-blocks", (req, res) => {
	getAllCodeBlocks(req, res);
});

module.exports = router;
