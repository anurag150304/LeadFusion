import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import e, { type Express } from "express";

import userRoute from "./routes/user.route.js";
import leadRoute from "./routes/leads.route.js";
import metaRoute from "./routes/meta.route.js";

const App: Express = e();

/* META WEBHOOK – NO CORS */
App.use("/api/v1/meta/webhook", metaRoute);

/* GLOBAL MIDDLEWARE */
App.use(cors());
App.use(e.json());
App.use(e.urlencoded({ extended: true }));
App.use(morgan("dev"));
App.use(cookieParser());

App.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to LeadFusion API Server" });
});

App.use("/api/v1/auth/user", userRoute);
App.use("/api/v1/leads", leadRoute);

export default App;
