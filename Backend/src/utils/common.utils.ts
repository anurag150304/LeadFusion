import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);
export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}
export const generateToken = (data: { email: string; password: string }) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn: "7d" });
}