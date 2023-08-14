import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./codeBlocks.reducer";

const store = configureStore({
	reducer: rootReducer,
});

export default store;
