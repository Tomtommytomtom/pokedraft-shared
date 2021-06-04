"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStringToTier = exports.mapSmogonTier = exports.SmogonTierKeys = exports.SmogonTierValues = exports.SmogonTier = void 0;
const enum_helpers_1 = require("../enum-helpers");
var SmogonTier;
(function (SmogonTier) {
    SmogonTier[SmogonTier["Illegal"] = 0] = "Illegal";
    SmogonTier[SmogonTier["LC"] = 1] = "LC";
    SmogonTier[SmogonTier["PU"] = 2] = "PU";
    SmogonTier[SmogonTier["NU"] = 3] = "NU";
    SmogonTier[SmogonTier["RU"] = 4] = "RU";
    SmogonTier[SmogonTier["UU"] = 5] = "UU";
    SmogonTier[SmogonTier["OU"] = 6] = "OU";
    SmogonTier[SmogonTier["Ubers"] = 7] = "Ubers";
})(SmogonTier = exports.SmogonTier || (exports.SmogonTier = {}));
exports.SmogonTierValues = enum_helpers_1.numberEnumValues(SmogonTier);
exports.SmogonTierKeys = enum_helpers_1.numberEnumKeys(SmogonTier);
exports.mapSmogonTier = {
    [SmogonTier.Ubers]: {
        name: "Uber"
    },
    [SmogonTier.OU]: {
        name: "OU"
    },
    [SmogonTier.UU]: {
        name: "UU"
    },
    [SmogonTier.RU]: {
        name: "RU"
    },
    [SmogonTier.NU]: {
        name: "NU"
    },
    [SmogonTier.PU]: {
        name: "PU"
    },
    [SmogonTier.LC]: {
        name: "LC"
    },
    [SmogonTier.Illegal]: {
        name: "Illegal"
    },
};
const mapStringToTier = (tier) => {
    switch (tier) {
        case 'Uber':
            return SmogonTier.Ubers;
        case 'OU':
            return SmogonTier.OU;
        case 'UU':
        case 'UUBL':
            return SmogonTier.UU;
        case 'RU':
        case 'RUBL':
            return SmogonTier.PU;
        case 'NU':
        case 'NUBL':
            return SmogonTier.NU;
        case 'PU':
        case '(PU)':
        case 'PUBL':
            return SmogonTier.PU;
        case 'LC':
        case 'NFE':
            return SmogonTier.LC;
        default:
            return SmogonTier.Illegal;
    }
};
exports.mapStringToTier = mapStringToTier;
