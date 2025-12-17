import { Router } from "express";
import { asyncWrap } from "../utils/asyncWrap.util.js";
import { getUserProfile, signinUser, signoutUser, signupUser } from "../controller/user.controller.js";
import { authUser } from "../middleware/authUser.middleware.js";

const router: Router = Router();
router.post("/signup", asyncWrap(signupUser));
router.post("/signin", asyncWrap(signinUser));
router.get("/profile", authUser, asyncWrap(getUserProfile));
router.get("/signout", authUser, asyncWrap(signoutUser));
export default router;