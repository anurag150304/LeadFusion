import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server | null = null;

export function initializeSocket(server: HttpServer) {
    if (io) return;
    if (!server) throw new Error("Server not initialized");
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`A user connected with id ${socket.id}`);

        socket.on("disconnect", () => {
            console.log("A user disconnected");
            io?.close();
        });
    });
}


