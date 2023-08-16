const { Server } = require("socket.io");

function handleUserJoinRoom(socket, io, roomId, clientsInRooms) {
	socket.join(roomId);
	console.debug(`User ${socket.id} joined room: ${roomId}`);

	if (!clientsInRooms[roomId]) {
		clientsInRooms[roomId] = new Set();
	}
	clientsInRooms[roomId].add(socket.id);

	const isFirstToJoin = clientsInRooms[roomId].size === 1;
	console.debug("clientsInRooms[roomId].size", clientsInRooms[roomId].size);

	if (isFirstToJoin) {
		console.debug("User", socket.id, "is the first to join");
		io.to(socket.id).emit("set-read-only", true);
	} else {
		console.debug("User", socket.id, "joined as non-first client");
		socket.emit("set-read-only", false);
	}
}

function handleCodeChange(socket, data) {
	const { roomId, code } = data;
	console.debug(`Code change in room ${roomId}:`, code);
	socket.to(roomId).emit("code-updated", code);
}

function handleUserDisconnect(socket, clientsInRooms) {
	console.debug("User disconnecting");
	for (const roomId in clientsInRooms) {
		if (clientsInRooms[roomId].has(socket.id)) {
			clientsInRooms[roomId].delete(socket.id);

			if (clientsInRooms[roomId].size === 0) {
				delete clientsInRooms[roomId];
			}
		}
	}
	console.debug("clientsInRooms", clientsInRooms);
}

module.exports = (server) => {
	const io = new Server(server, {
		cors: {
			origin: ["http://localhost:5173", "https://code-web-app.onrender.com/"],
		},
	});

	const clientsInRooms = {};

	io.on("connection", (socket) => {
		console.debug("A user connected");

		socket.on("join-room", (roomId) => {
			handleUserJoinRoom(socket, io, roomId, clientsInRooms);
		});

		socket.on("code-change", (data) => {
			handleCodeChange(socket, data, io);
		});

		socket.on("disconnect", () => {
			handleUserDisconnect(socket, clientsInRooms);
		});
	});
};
