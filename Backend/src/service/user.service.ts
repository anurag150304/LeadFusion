import DB from "../config/db.config.js";
import { Role } from "../generated/prisma/index.js";
import type { User } from "../types/common.type.js";
import { ErrHandler } from "../types/errHandler.js";

export async function createUser(data: User) {
    const { firstName, lastName, email, password, phone, role } = data;
    if (!firstName || !email || !password || !phone || !role) {
        throw new ErrHandler(400, "Missing required fields");
    }
    try {
        const existingUserByEmail = await DB.user.findFirst({ where: { email, } });
        const existingUserByPhone = await DB.user.findFirst({ where: { phone } });
        if (existingUserByEmail) throw new ErrHandler(409, "Email already exists");
        if (existingUserByPhone) throw new ErrHandler(409, "Phone number already exists");

        const user = await DB.user.create({
            data: {
                firstName,
                ...(lastName && { lastName }),
                email,
                password,
                phone,
                role: Role[role as keyof typeof Role],
            }
        });
        return !!user;
    } catch (err) {
        throw err;
    }
}