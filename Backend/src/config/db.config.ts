import { PrismaClient } from "../generated/prisma/client.js";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient({
    log: ["error", "warn"],
    accelerateUrl: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19KWlRET3BFTWZzTzhhSG5pRW4zZlciLCJhcGlfa2V5IjoiMDFLQ1ZRWEgxNlQ3MERKTTZSSFAzNkZENUQiLCJ0ZW5hbnRfaWQiOiIwMWU5MTRkZTNiYjFkNTUzNThkYzBlMjE0MGQzMzNkMzgyZGQ0MGUwNjNlNTlkYmI1MDJkYTViMDM3MmM0NmQ0IiwiaW50ZXJuYWxfc2VjcmV0IjoiNDUwZGIxOWMtYzdiMS00ZTRlLTk5ZmMtY2NiY2NmZjcwZDI0In0.t_yoUvwXGcZBzPV05pJXjxN7uCS-BOWmd244DR1x32I"
});

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;