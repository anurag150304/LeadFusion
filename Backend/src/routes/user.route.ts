import { Router } from "express";
import { asyncWrap } from "../utils/asyncWrap.util.js";
import { signupUser } from "../controller/user.controller.js";

const router: Router = Router();
router.get("/signup", asyncWrap(signupUser));

export default router;