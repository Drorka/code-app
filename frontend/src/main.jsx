import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Lobby />} />
					<Route path="/code/:id" element={<CodeBlock />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
);
