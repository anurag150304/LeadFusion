import DB from "../lib/db.config.js";
import type { LeadSchema } from "../schema/lead.schema.js";

export async function createNewLead(data: LeadSchema) {
    const {
        fullName,
        email,
        phone,
        pickupAddress,
        dropAddress,
        pickupDateTime,
        dropDateTime,
        passengers,
        Luggage,
        vechicle,
        vechicleType,
        tripType,
        city,
        source,
        status,
        note } = data;

    if (!fullName || !phone || !pickupAddress || !dropAddress || !pickupDateTime || !dropDateTime || !passengers || !Luggage || !vechicle || !vechicleType || !tripType || !city || !source || !status) {
        throw new Error("Missing required fields");
    }

    return await DB.lead.create({
        data: {
            fullName,
            ...(email && { email }),
            phone,
            pickupAddress,
            dropAddress,
            pickupDateTime,
            dropDateTime,
            passengers,
            Luggage,
            vechicle,
            vechicleType,
            tripType,
            city,
            source,
            status,
            ...(note && { note }),
        },
    });
}