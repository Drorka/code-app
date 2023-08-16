const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const codeBlocksRoutes = require("./routes/codeBlocks.routes");
const { mongoConnect } = require("./db");

const http = require("http");
const server = http.createServer(app);
const socketIOSetup = require("./sockets/socket");

app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../frontend/dist")));
} else {
	app.use(
		cors({
			origin: ["http://localhost:5173"],
		})
	);
}

app.use("/api", codeBlocksRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

const startServer = async () => {
	await mongoConnect();
	const PORT = process.env.PORT || 3030;
	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
	socketIOSetup(server);
};

startServer();

module.exports = { app };
