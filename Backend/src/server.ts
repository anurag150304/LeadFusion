import "dotenv/config"
import { createServer } from "http";
import App from "./app.js";

const server = createServer(App);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));