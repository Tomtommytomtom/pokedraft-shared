import { Pokemon } from "./pokemon";
export declare enum PokemonType {
    Normal = "Normal",
    Fighting = "Fighting",
    Flying = "Flying",
    Poison = "Poison",
    Ground = "Ground",
    Rock = "Rock",
    Bug = "Bug",
    Ghost = "Ghost",
    Steel = "Steel",
    Fire = "Fire",
    Water = "Water",
    Grass = "Grass",
    Electric = "Electric",
    Psychic = "Psychic",
    Ice = "Ice",
    Dragon = "Dragon",
    Dark = "Dark",
    Fairy = "Fairy"
}
export declare const pokemonTypeMapping: Record<PokemonType, any>;
export declare const calculateWeaknesses: (types: PokemonType[]) => Record<PokemonType, Weakness>;
export declare enum Weakness {
    Immune = 0,
    VeryResistant = 0.25,
    Resistant = 0.5,
    Neutral = 1,
    Weak = 2,
    VeryWeak = 4
}
export declare const getWeakness: (pokemon: Pokemon) => Record<Weakness, PokemonType[]>;
export declare const getWeaknessName: (weakness: Weakness) => string;
