import type { Request, Response } from "express";
import { leadSchema } from "../schema/lead.schema.js";
import { createNewLead } from "../service/leads.service.js";
import { ErrHandler } from "../types/errHandler.js";
import { sendPayload } from "../socket.js";

export async function createLead(req: Request, res: Response) {
    const parsedData = leadSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.issues.map(iss => iss.message) });
    }

    const newLead = await createNewLead(parsedData.data);
    if (!newLead) throw new ErrHandler(400, "Failed to create lead");

    if (!sendPayload("new_lead", newLead)) throw new ErrHandler(500, "Failed to send payload");;
    return res.status(201).json({ message: "Lead created successfully" });
}