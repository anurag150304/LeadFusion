import jwt from "jsonwebtoken";
import DB from "../lib/db.config.js";
import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/common.type.js";
import redisClient from "../redis/db.js";

export async function authUser(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.auth_token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    try {
        const blackListedToken = await redisClient.get(`token_${token}`);
        if (blackListedToken) return res.status(401).json({ error: "token has been blacklisted" });

        const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY!) as { email: string };
        const user = await DB.user.findFirst({
            where: { email: decoded.email }, select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
            }
        });

        if (!user) return res.status(401).json({ error: "Unauthorized access" });
        (req as AuthenticatedRequest).user = user;
        return next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}