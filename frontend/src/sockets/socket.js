import io from "socket.io-client";

const BASE_URL = import.meta.env.DEV
	? import.meta.env.VITE_BASE_URL_DEV
	: import.meta.env.VITE_BASE_URL_PROD;

const socket = io(BASE_URL);

function connectSocket(id) {
	console.log("Connecting socket", socket.connected);
	socket.connect();
	console.log("Connected socket", socket.connected);

	console.log("Joining room:", id);
	socket.emit("join-room", id);
}

function setupSocketListeners(onUpdatedCode, onSetReadOnly) {
	socket.on("code-updated", onUpdatedCode);
	socket.on("set-read-only", onSetReadOnly);
	socket.on("connect", () => {
		console.log("Socket connected:", socket.id);
	});
}

function disconnectSocket() {
	console.log("Socket is connected?", socket.connected);
	socket.disconnect();
}

function emitCodeChange(roomId, code) {
	socket.emit("code-change", { roomId, code });
}

export {
	connectSocket,
	setupSocketListeners,
	disconnectSocket,
	emitCodeChange,
};
