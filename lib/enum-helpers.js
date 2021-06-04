"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberEnumValues = exports.numberEnumKeys = void 0;
const numberEnumKeys = (e) => {
    return Object.keys(e).filter(k => typeof e[k] === "number");
};
exports.numberEnumKeys = numberEnumKeys;
const numberEnumValues = (e) => {
    const keys = exports.numberEnumKeys(e);
    return keys.map(k => e[k]);
};
exports.numberEnumValues = numberEnumValues;
