"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDraftGame = exports.createStandardRules = exports.turnToText = exports.playerTwoArray = exports.playerOneArray = exports.turns = exports.defaultTurnOrder = exports.turnMapping = exports.Action = exports.Player = void 0;
const pokemon_1 = require("./pokemon/pokemon");
var Player;
(function (Player) {
    Player["One"] = "PLAYER_1";
    Player["Two"] = "PLAYER_2";
})(Player = exports.Player || (exports.Player = {}));
const playerMapping = {
    [Player.One]: 'Player 1',
    [Player.Two]: 'Two'
};
const playerToText = (p) => {
    return playerMapping[p];
};
var Action;
(function (Action) {
    Action["Pick"] = "ACTION_PICK";
    Action["Ban"] = "ACTION_BAN";
})(Action = exports.Action || (exports.Action = {}));
const actionMapping = {
    [Action.Pick]: {
        noun: 'Pick',
        verbPast: 'picked'
    },
    [Action.Ban]: {
        noun: 'Ban',
        verbPast: 'banned'
    },
};
const actionToText = (a) => {
    return actionMapping[a].verbPast;
};
exports.turnMapping = {
    '1P': {
        player: Player.One,
        action: Action.Pick
    },
    '1B': {
        player: Player.One,
        action: Action.Ban
    },
    '2P': {
        player: Player.Two,
        action: Action.Pick
    },
    '2B': {
        player: Player.Two,
        action: Action.Ban
    }
};
exports.defaultTurnOrder = [
    '1B',
    '2P',
    '1P',
    '2B',
    '1B',
    '2P',
    '1P',
    '2B',
    '1B',
    '2P',
    '1P',
    '2B',
    '1B',
    '2P',
    '1P',
    '2B',
    '1B',
    '2P',
    '1B',
    '2B',
    '1P',
    '2B',
    '1P',
    '2P', //24
];
exports.turns = exports.defaultTurnOrder.map(t => exports.turnMapping[t]);
const createArrayIndexReducer = (isCondition) => (arr, element, index) => {
    if (isCondition(element)) {
        return arr.concat(index);
    }
    else {
        return arr;
    }
};
const playerOneReducer = createArrayIndexReducer((e) => e.includes('1'));
const playerTwoReducer = createArrayIndexReducer((e) => e.includes('2'));
exports.playerOneArray = exports.defaultTurnOrder.reduce(playerOneReducer, []);
exports.playerTwoArray = exports.defaultTurnOrder.reduce(playerTwoReducer, []);
const turnToText = (turn) => {
    return [playerToText(turn.player), actionToText(turn.action), turn.pokemon?.name].join(" ");
};
exports.turnToText = turnToText;
const allowedPicks = new Array(6).fill(pokemon_1.SmogonTier.OU);
const createStandardRules = () => ({
    pickPattern: exports.defaultTurnOrder.map(t => exports.turnMapping[t]),
    allowedPicks,
    timer: 100
});
exports.createStandardRules = createStandardRules;
const createDraftGame = () => ({
    [Player.One]: {
        picks: [],
        bans: []
    },
    [Player.Two]: {
        picks: [],
        bans: []
    },
    turnNumber: 0,
    history: [],
    rules: exports.createStandardRules()
});
exports.createDraftGame = createDraftGame;
