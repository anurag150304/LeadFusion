import "dotenv/config"
import { createServer } from "http";
import App from "./app.js";
import { initializeSocket } from "./socket.js";

const server = createServer(App);
const PORT = process.env.PORT || 3000;

initializeSocket(server);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));