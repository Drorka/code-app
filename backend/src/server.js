const express = require("express");
const app = express();

const cors = require("cors");
const codeBlocksRoutes = require("./routes/codeBlocks.routes");
const { mongoConnect } = require("./db");

const http = require("http");
const server = http.createServer(app);
const socketIOSetup = require("./sockets/index");

app.use(express.json());
app.use(
	cors({
		origin: [
			"http://localhost:8080",
			"http://localhost:3000",
			"http://localhost:5173",
		],
	})
);

app.use("/api", codeBlocksRoutes);

mongoConnect(() => {
	const PORT = process.env.PORT || 3030;
	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
	socketIOSetup(server);
});

module.exports = { app };
