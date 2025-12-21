import { Router } from "express";
import { asyncWrap } from "../utils/asyncWrap.util.js";
import { createLead } from "../controller/leads.controller.js";

const router: Router = Router();

router.post("/website/leadgen", asyncWrap(createLead));
// router.get("/meta/webhook/leadgen", (req: Request, res: Response) => {

// });

export default router;