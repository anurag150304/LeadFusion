import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().optional(),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    phone: z.string().min(10, { message: "Phone number must be 10 digits" }),
    role: z.enum(["admin", "sales_executive"]),
}).strict().refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
});

export const signinSchema = z.object({
    email: z.email({ message: "Invalid email address" }).optional(),
    phone: z.string().min(10, { message: "Phone number must be 10 digits" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});