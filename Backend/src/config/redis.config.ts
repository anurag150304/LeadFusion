import { Redis } from "ioredis";

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD!,
});

redisClient.on("connect", () => console.log("connected to Redis"));
export default redisClient;