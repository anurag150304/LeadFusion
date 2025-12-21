import type { Request } from "express";
export interface User {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    user: {
        firstName: string;
        lastName: string | null;
        email: string;
        phone: string;
        role: string;
    }
}