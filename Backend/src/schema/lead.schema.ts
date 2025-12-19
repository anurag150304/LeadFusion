import { z } from "zod";

export const leadSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email().optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    pickupAddress: z.string().min(1, "Pickup address is required"),
    dropAddress: z.string().min(1, "Drop address is required"),
    pickupDateTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid pickup date and time",
    }),
    dropDateTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid drop date and time",
    }),
    passengers: z.number().min(1, "At least one passenger is required"),
    Luggage: z.number().min(0, "Luggage count cannot be negative"),
    vechicle: z.enum(["Cars", "SUVs", "LuxuryCars", "TempoTraveller", "MiniBus", "LuxuryBus"]),
    vechicleType: z.enum(["AC", "NON_AC"]).default("AC"),
    tripType: z.enum(["ONE_WAY", "ROUND_TRIP"]).default("ONE_WAY"),
    city: z.string().min(1, "City is required"),
    source: z.string().min(1, "Lead source is required"),
    status: z.string().default("NEW"),
    note: z.string().optional(),
});