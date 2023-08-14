import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const codeBlocksSlice = createSlice({
	name: "codeBlocks",
	initialState,
	reducers: {
		setCodeBlocks: (state, action) => {
			return action.payload;
		},
	},
});

export const { setCodeBlocks } = codeBlocksSlice.actions;

export default codeBlocksSlice.reducer;
