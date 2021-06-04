"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatColor = exports.statsMapping = exports.statsKeys = void 0;
exports.statsKeys = ["hp", "atk", "def", "spa", "spd", "spe"];
exports.statsMapping = {
    hp: {
        abbr: "Hp",
        name: "Health",
    },
    atk: {
        abbr: "Atk",
        name: "Attack"
    },
    def: {
        abbr: "Def",
        name: "Defense"
    },
    spa: {
        abbr: "SpA",
        name: "Sp. Attack"
    },
    spd: {
        abbr: "SpD",
        name: "Sp. Defense"
    },
    spe: {
        abbr: "Sp",
        name: "Speed"
    }
};
const getStatColor = (value) => {
    if (value < 40) {
        return '#cc0000';
    }
    if (value < 60) {
        return '#cc3000';
    }
    if (value < 80) {
        return '#cc7700';
    }
    if (value < 100) {
        return '#3dcc00';
    }
    if (value < 130) {
        return '#00cc88';
    }
    return '#00ccad';
};
exports.getStatColor = getStatColor;
