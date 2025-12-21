import { Router, type Request, type Response } from "express";
import { fetchMetaLead } from "../controller/meta.leadgen.controller.js";
// import { asyncWrap } from "../utils/asyncWrap.util.js";/
const router: Router = Router();

router.get("/leadgen", async (req: Request, res: Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    const data = req.query["hub.entry"];
    console.log(mode, token, challenge, data);

    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN!) {
        return res.status(200).send(challenge as string);
    }
    return res.sendStatus(403);
});


router.post("/leadgen", async (req: Request, res: Response) => {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const leadgenId = change?.value?.leadgen_id;

    if (!leadgenId) return res.sendStatus(200);

    console.log(entry, change, leadgenId);
    const lead = await fetchMetaLead(leadgenId);
    console.log(lead);
    return res.sendStatus(200);
});

export default router;