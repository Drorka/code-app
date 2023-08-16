import io from "socket.io-client";

const BASE_URL = import.meta.env.DEV
	? import.meta.env.VITE_BASE_URL_DEV
	: import.meta.env.VITE_BASE_URL_PROD;

const socket = io(BASE_URL);

function connectSocket(id) {
	socket.connect();
	socket.emit("join-room", id);
}

function setupSocketListeners(onUpdatedCode, onSetReadOnly) {
	socket.on("code-updated", onUpdatedCode);
	socket.on("set-read-only", onSetReadOnly);
}

function disconnectSocket() {
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
