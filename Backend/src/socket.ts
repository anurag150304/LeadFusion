import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { ErrHandler } from "./types/errHandler.js";

let io: Server | null = null;

export function initializeSocket(server: HttpServer) {
    if (io) return;
    if (!server) throw new Error("Server not initialized");
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`A user connected with id socket ID: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log("A user disconnected");
            io?.close();
        });
    });
}

export function sendPayload(event: string, payload: any) {
    if (!io) throw new Error("Socket not initialized");
    if (!event || !payload) throw new ErrHandler(400, "Event and payload are required");
    io.emit(event, payload);
    return true;
}


