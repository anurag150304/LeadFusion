enum LeadStatus {
    NEW = "NEW",
    CONTACTED = "CONTACTED",
    QUALIFIED = "QUALIFIED",
    CONVERTED = "CONVERTED",
    LOST = "LOST",
}

enum LeadSource {
    WEBSITE = "WEBSITE",
    META_ADS = "META_ADS",
    GOOGLE_ADS = "GOOGLE_ADS",
}

enum VechicleType {
    AC = "AC",
    NON_AC = "NON_AC",
}

enum TripType {
    ONE_WAY = "ONE_WAY",
    ROUND_TRIP = "ROUND_TRIP",
}

enum Vechicle {
    Cars = "Cars",
    SUVs = "SUVs",
    LuxuryCars = "LuxuryCars",
    TempoTraveller = "TempoTraveller",
    MiniBus = "MiniBus",
    LuxuryBus = "LuxuryBus",
}

export {
    LeadStatus,
    LeadSource,
    VechicleType,
    TripType,
    Vechicle,
};