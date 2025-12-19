import type { Request } from "express";
import type { LeadSource, LeadStatus, TripType, Vechicle, VechicleType } from "./lead.enums.js";
export interface User {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    user: {
        firstName: string;
        lastName: string | null;
        email: string;
        phone: string;
        role: string;
    }
}

export interface Lead {
    fullName: string;
    email: string | undefined;
    phone: string;
    pickupAddress: string;
    dropAddress: string;
    pickupDateTime: string;
    dropDateTime: string;
    passengers: number;
    Luggage: number;
    vechicle: Vechicle;
    vechicleType: VechicleType;
    tripType: TripType;
    city: string;
    source: LeadSource;
    status: LeadStatus;
    note: string | undefined;
}