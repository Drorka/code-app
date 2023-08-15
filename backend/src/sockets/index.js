const { Server } = require("socket.io");

module.exports = (server) => {
	const io = new Server(server, {
		cors: {
			origin: [
				"http://localhost:8080",
				"http://localhost:3000",
				"http://localhost:5173",
				"https://code-web-app.onrender.com/",
			],
		},
	});

	const clientsInRooms = {};
	io.on("connection", (socket) => {
		console.debug("A user connected");

		socket.on("join-room", (roomId) => {
			socket.join(roomId);
			console.debug(`User ${socket.id} joined room: ${roomId}`);

			// Update clientsInRooms
			if (!clientsInRooms[roomId]) {
				clientsInRooms[roomId] = new Set();
			}
			clientsInRooms[roomId].add(socket.id);

			// Check if client is first (tutor) or not (student)
			const isFirstToJoin = clientsInRooms[roomId].size === 1;
			console.debug("clientsInRooms[roomId].size", clientsInRooms[roomId].size);

			if (isFirstToJoin) {
				console.debug("User", socket.id, "is the first to join");
				// Emit to the first client
				io.to(socket.id).emit("set-read-only", true);
			} else {
				console.debug("User", socket.id, "joined as non-first client");
				// Emit to other clients
				socket.emit("set-read-only", false);
			}
		});

		socket.on("code-change", (data) => {
			const { roomId, code } = data;
			console.debug(`Code change in room ${roomId}:`, code);
			io.to(roomId).emit("code-updated", code);
		});

		socket.on("disconnect", () => {
			console.debug("User disconnecting");
			for (const roomId in clientsInRooms) {
				if (clientsInRooms[roomId].has(socket.id)) {
					clientsInRooms[roomId].delete(socket.id);

					// Remove the room from clientsInRooms if no more clients
					if (clientsInRooms[roomId].size === 0) {
						delete clientsInRooms[roomId];
					}
				}
			}

			console.debug("clientsInRooms", clientsInRooms);
		});
	});
};
