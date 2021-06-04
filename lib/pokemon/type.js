"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeaknessName = exports.getWeakness = exports.Weakness = exports.calculateWeaknesses = exports.pokemonTypeMapping = exports.PokemonType = void 0;
var PokemonType;
(function (PokemonType) {
    PokemonType["Normal"] = "Normal";
    PokemonType["Fighting"] = "Fighting";
    PokemonType["Flying"] = "Flying";
    PokemonType["Poison"] = "Poison";
    PokemonType["Ground"] = "Ground";
    PokemonType["Rock"] = "Rock";
    PokemonType["Bug"] = "Bug";
    PokemonType["Ghost"] = "Ghost";
    PokemonType["Steel"] = "Steel";
    PokemonType["Fire"] = "Fire";
    PokemonType["Water"] = "Water";
    PokemonType["Grass"] = "Grass";
    PokemonType["Electric"] = "Electric";
    PokemonType["Psychic"] = "Psychic";
    PokemonType["Ice"] = "Ice";
    PokemonType["Dragon"] = "Dragon";
    PokemonType["Dark"] = "Dark";
    PokemonType["Fairy"] = "Fairy";
})(PokemonType = exports.PokemonType || (exports.PokemonType = {}));
exports.pokemonTypeMapping = {
    Normal: {
        color: "#a8a878"
    },
    Fighting: {
        color: "#c03028"
    },
    Fire: {
        color: "#f08030"
    },
    Water: {
        color: "#6890f0"
    },
    Grass: {
        color: "#78c850"
    },
    Electric: {
        color: "#f8d030"
    },
    Psychic: {
        color: "#f85888"
    },
    Ice: {
        color: "#98d8d8"
    },
    Dragon: {
        color: "#7038f8"
    },
    Dark: {
        color: "#705848"
    },
    Fairy: {
        color: "#ee99ac"
    },
    Flying: {
        color: "#a890f0"
    },
    Poison: {
        color: "#a040a0"
    },
    Ground: {
        color: "#e0c068"
    },
    Rock: {
        color: "#e0c068"
    },
    Bug: {
        color: "#a8b820"
    },
    Ghost: {
        color: "#705898"
    },
    Steel: {
        color: "#b8b8d0"
    }
};
const order = [
    PokemonType.Normal,
    PokemonType.Fighting,
    PokemonType.Flying,
    PokemonType.Poison,
    PokemonType.Ground,
    PokemonType.Rock,
    PokemonType.Bug,
    PokemonType.Ghost,
    PokemonType.Steel,
    PokemonType.Fire,
    PokemonType.Water,
    PokemonType.Grass,
    PokemonType.Electric,
    PokemonType.Psychic,
    PokemonType.Ice,
    PokemonType.Dragon,
    PokemonType.Dark,
    PokemonType.Fairy,
];
const weaknessChart = ({
    //No,Fi,Fl,Po,Gr,Ro,Bu,Gh,St,Fi,Wa,Gr,El,Ps,Ic,Dr,Da,Fa
    [PokemonType.Normal]: [1, 1, 1, 1, 1, .5, 1, 0, .5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [PokemonType.Fighting]: [2, 1, .5, .5, 1, 2, .5, 0, 2, 1, 1, 1, 1, .5, 2, 1, 2, .5],
    [PokemonType.Flying]: [1, 2, 1, 1, 1, .5, 2, 1, .5, 1, 1, 2, .5, 1, 1, 1, 1, 1],
    [PokemonType.Poison]: [1, 1, 1, .5, .5, .5, 1, .5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [PokemonType.Ground]: [1, 1, 0, 2, 1, 2, .5, 1, 2, 2, 1, .5, 2, 1, 1, 1, 1, 1],
    [PokemonType.Rock]: [1, .5, 2, 1, .5, 1, 2, 1, .5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
    [PokemonType.Bug]: [1, .5, .5, .5, 1, 1, 1, .5, .5, .5, 1, 2, 1, 2, 1, 1, 2, .5],
    [PokemonType.Ghost]: [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, .5, 1],
    [PokemonType.Steel]: [1, 1, 1, 1, 1, 2, 1, 1, .5, .5, .5, 1, .5, 1, 2, 1, 1, 2],
    [PokemonType.Fire]: [1, 1, 1, 1, 1, .5, 2, 1, 2, .5, .5, 2, 1, 1, 2, 1, 1, 1],
    [PokemonType.Water]: [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, .5, .5, 1, 1, 1, .5, 1, 1],
    [PokemonType.Grass]: [1, 1, .5, .5, 2, 2, .5, 1, .5, .5, 2, .5, 1, 1, 1, .5, 1, 1],
    [PokemonType.Electric]: [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, .5, .5, 1, 1, .5, 1, 1],
    [PokemonType.Psychic]: [1, 2, 1, 2, 1, 1, 1, 1, .5, 1, 1, 1, 1, .5, 1, 1, 0, 1],
    [PokemonType.Ice]: [1, 1, 2, 1, 2, 1, 1, 1, .5, .5, .5, 2, 1, 1, .5, 2, 1, 1],
    [PokemonType.Dragon]: [1, 1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
    [PokemonType.Dark]: [1, .5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, .5, .5],
    [PokemonType.Fairy]: [1, 2, 1, .5, 1, 1, 1, 1, .5, .5, 1, 1, 1, 1, 1, 2, 2, 1],
}); //No,Fi,Fl,Po,Gr,Ro,Bu,Gh,St,Fi,Wa,Gr,El,Ps,Ic,Dr,Da,Fa
const calculateWeaknesses = (types) => {
    let result = {};
    Object.entries(weaknessChart).forEach(([type, row]) => {
        const indices = types.map((t) => order.indexOf(t));
        result[type] = indices.reduce((res, i) => res * row[i], 1);
    });
    return result;
};
exports.calculateWeaknesses = calculateWeaknesses;
var Weakness;
(function (Weakness) {
    Weakness[Weakness["Immune"] = 0] = "Immune";
    Weakness[Weakness["VeryResistant"] = 0.25] = "VeryResistant";
    Weakness[Weakness["Resistant"] = 0.5] = "Resistant";
    Weakness[Weakness["Neutral"] = 1] = "Neutral";
    Weakness[Weakness["Weak"] = 2] = "Weak";
    Weakness[Weakness["VeryWeak"] = 4] = "VeryWeak";
})(Weakness = exports.Weakness || (exports.Weakness = {}));
const weaknessMap = {
    4: {
        name: "Very Weak"
    },
    2: {
        name: "Weak"
    },
    1: {
        name: "Neutral"
    },
    0.5: {
        name: "Resistant"
    },
    0.25: {
        name: "Very Resistant"
    },
    0: {
        name: "Immune"
    },
};
const mapWeaknessToEnum = (weakness) => {
    const result = {};
    Object.entries(weakness).forEach(([type, value]) => {
        if (!result[value]) {
            result[value] = [type];
        }
        else {
            result[value].push(type);
        }
    });
    return result;
};
const getWeakness = (pokemon) => {
    const weaknesses = exports.calculateWeaknesses(pokemon.types);
    return mapWeaknessToEnum(weaknesses);
};
exports.getWeakness = getWeakness;
const getWeaknessName = (weakness) => {
    return weaknessMap[weakness].name;
};
exports.getWeaknessName = getWeaknessName;
