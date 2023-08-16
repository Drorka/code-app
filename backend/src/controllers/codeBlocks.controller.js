const CodeBlock = require("../models/codeBlock");

async function getAllCodeBlocks(req, res) {
	try {
		const codeBlocks = await CodeBlock.find();
		res.json(codeBlocks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = {
	getAllCodeBlocks,
};
