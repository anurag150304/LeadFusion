import { type Request, type Response } from "express";
import { signinSchema, signupSchema } from "../schema/authUser.schema.js";
import { hashPassword } from "../utils/common.utils.js";
import { createUser } from "../service/user.service.js";
import { ErrHandler } from "../types/errHandler.js";

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

// export async function signinUser(req: Request, res: Response) {
//     const parsedData = signinSchema.safeParse(req.body);
//     if (!parsedData.success) {
//         return res.status(200).json({ errors: parsedData.error.issues.map(issue => issue.message) });
//     }

//     const { email, phone, password } = parsedData.data;
// }