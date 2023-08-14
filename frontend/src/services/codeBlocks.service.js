import { httpService } from "./http.service.js";

export const codeBlocksService = {
	getCodeBlocks,
};

async function getCodeBlocks() {
	try {
		return await httpService.get("code-blocks");
	} catch (error) {
		console.error("Failed to get code blocks");
		throw error;
	}
}
