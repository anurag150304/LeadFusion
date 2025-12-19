import type { Request, Response } from "express";
import { leadSchema } from "../schema/lead.schema.js";
import { createNewLead } from "../service/leads.service.js";

// export async function createLead(req: Request, res: Response) {
//     const parsedData = leadSchema.safeParse(req.body);
//     if (!parsedData.success) {
//         return res.status(400).json({ errors: parsedData.error.issues.map(iss => iss.message) });
//     }

//     const newLead = await createNewLead(parsedData.data);
// }