import { PokemonType } from "./type";
import { Stats } from "./stats";
export interface Ability {
    0: string;
    1?: string;
    H?: string;
}
export declare enum SmogonTier {
    Illegal = 0,
    LC = 1,
    PU = 2,
    NU = 3,
    RU = 4,
    UU = 5,
    OU = 6,
    Ubers = 7
}
export declare const SmogonTierValues: SmogonTier[];
export declare const SmogonTierKeys: ("Illegal" | "LC" | "PU" | "NU" | "RU" | "UU" | "OU" | "Ubers")[];
export declare const mapSmogonTier: Record<SmogonTier, {
    name: string;
}>;
export declare type stringTier = "LC" | "NFE" | "RUBL" | "PU" | "NU" | "(PU)" | "Illegal" | "UU" | "OU" | "UUBL" | "PUBL" | "RU" | "Uber" | "NUBL";
export declare const mapStringToTier: (tier: stringTier) => SmogonTier;
export interface Pokemon {
    name: string;
    key: string;
    id: number;
    types: [PokemonType] | [PokemonType, PokemonType];
    abilities: Ability;
    smogonTier: string;
    stats: Stats;
}
