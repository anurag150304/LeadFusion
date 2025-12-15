import e, { type Express, type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import type { ErrHandler } from "./types/errHandler.js";

const App: Express = e();

App.use(cors());
App.use(morgan("dev"));
App.use(e.urlencoded({ extended: true }));

App.get("/", (_: Request, res: Response) => {
    res.send("Hello World");
});

App.use("/api/user", userRoute);

App.use((err: ErrHandler, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    const { status = 500, message } = err;
    console.log(err);
    res.status(status).json({ error: message });
});
export default App;