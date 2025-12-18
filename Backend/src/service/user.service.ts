import DB from "../config/db.config.js";
import { Role } from "@prisma/client";
import type { User } from "../types/common.type.js";
import { ErrHandler } from "../types/errHandler.js";
import { comparePassword } from "../utils/common.utils.js";

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

export async function validateUser(data: Omit<User, "firstName" | "lastName" | "phone" | "role">) {
    const { email, password } = data;
    if (!email || !password) {
        throw new ErrHandler(400, "Missing required fields");
    }

    try {
        const user = await DB.user.findFirst({ where: { email }, select: { password: true } });
        if (!user) throw new ErrHandler(404, "User not found");

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) throw new ErrHandler(401, "Invalid credentials");

        return user;
    } catch (err) {
        throw err;
    }
}