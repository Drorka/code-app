import io from "socket.io-client";

const socket = io("http://localhost:3030");

const setupSocketListeners = (id, onUpdatedCode, onSetReadOnly) => {
	console.log("connecting", socket.connected);
	socket.connect();
	console.log("connecting", socket.connected);

	console.log("Joining room:", id);
	socket.emit("join-room", id);

	socket.on("code-updated", onUpdatedCode);
	socket.on("set-read-only", onSetReadOnly);
	socket.on("connect", () => {
		console.log("Socket connected:", socket.id);
	});

	return () => {
		console.log("Socket is connected?", socket.connected);
		socket.off("code-updated", onUpdatedCode);
		socket.off("set-read-only", onSetReadOnly);
		socket.disconnect();
	};
};

const emitCodeChange = (roomId, code) => {
	socket.emit("code-change", { roomId, code });
};

export { setupSocketListeners, emitCodeChange };
