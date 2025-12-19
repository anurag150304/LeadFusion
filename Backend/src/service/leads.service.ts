import DB from "../config/db.config.js";
import type { Lead } from "../types/common.type.js";

export async function createNewLead(data: Lead) {
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