import { Router } from "express";
import { asyncWrap } from "../utils/asyncWrap.util.js";

const router: Router = Router();

router.post("/create", asyncWrap());

export default router;