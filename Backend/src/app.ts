import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import type { ErrHandler } from "./types/errHandler.js";
import e, { type Express, type NextFunction, type Request, type Response } from "express";

const App: Express = e();

App.use(cors());
App.use(e.json());
App.use(morgan("dev"));
App.use(cookieParser());
App.use(e.urlencoded({ extended: true }));

App.get("/", (_: Request, res: Response) => {
    return res.status(200).json({ message: "Welcome to LeadFusion API Server" });
});

App.use("/api/v1/auth/user", userRoute);

App.use((err: ErrHandler, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    const { status = 500, message } = err;
    console.log(err);
    res.status(status).json({ error: message });
});
export default App;