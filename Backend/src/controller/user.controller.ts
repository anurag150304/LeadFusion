import { type Request, type Response } from "express";
import { signinSchema, signupSchema } from "../schema/authUser.schema.js";
import { generateToken, hashPassword } from "../utils/common.utils.js";
import { createUser, validateUser } from "../service/user.service.js";
import { ErrHandler } from "../types/errHandler.js";
import type { AuthenticatedRequest } from "../types/common.type.js";
import redisClient from "../redis/db.js";

export async function signupUser(req: Request, res: Response) {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(200).json({ errors: parsedData.error.issues.map(issue => issue.message) });
    }

    const { firstName, lastName, email, password, phone, role } = parsedData.data;
    const hashedPassword = await hashPassword(password);

    const user = await createUser({ firstName, ...(lastName && { lastName }), email, password: hashedPassword, phone, role });
    if (!user) throw new ErrHandler(400, "User creation failed");
    return res.status(200).json({ message: "User created successfully" });
}

export async function signinUser(req: Request, res: Response) {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(200).json({ errors: parsedData.error.issues.map(issue => issue.message) });
    }

    const { email, password } = parsedData.data;
    const user = await validateUser({ email, password });
    if (!user) throw new ErrHandler(401, "Failed to sign in, Try again");

    const token = generateToken({ email, password });
    res.cookie("auth_token", token);
    return res.status(200).json({ message: "Signed in successfully", token });
}

export async function getUserProfile(req: Request, res: Response) {
    return res.status(200).json({ user: (req as AuthenticatedRequest).user });
}

export async function signoutUser(req: Request, res: Response) {
    const token = req.cookies?.auth_token || req.headers.authorization?.split(" ")[1];
    await redisClient.set(`token_${token}`, "blacklisted", "EX", 60 * 60 * 24); // Expire in 24 hours

    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Signed out successfully" });
}