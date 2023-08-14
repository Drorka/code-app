import { combineReducers } from "redux";
import codeBlocksReducer from "./codeBlocksSlice";

const rootReducer = combineReducers({
	codeBlocks: codeBlocksReducer,
});

export default rootReducer;
