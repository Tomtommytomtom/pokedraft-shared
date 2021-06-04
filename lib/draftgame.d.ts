import { Pokemon, SmogonTier } from "./pokemon/pokemon";
export declare enum Player {
    One = "PLAYER_1",
    Two = "PLAYER_2"
}
export declare enum Action {
    Pick = "ACTION_PICK",
    Ban = "ACTION_BAN"
}
export declare const turnMapping: Record<string, Turn>;
export declare const defaultTurnOrder: string[];
export declare const turns: Turn[];
export declare const playerOneArray: number[];
export declare const playerTwoArray: number[];
export interface Turn {
    player: Player;
    action: Action;
    pokemon?: Pokemon;
}
export declare const turnToText: (turn: Turn) => string;
interface Rules {
    pickPattern: Turn[];
    allowedPicks: [SmogonTier, SmogonTier, SmogonTier, SmogonTier, SmogonTier, SmogonTier];
    timer: number;
}
export declare const createStandardRules: () => {
    pickPattern: Turn[];
    allowedPicks: [SmogonTier, SmogonTier, SmogonTier, SmogonTier, SmogonTier, SmogonTier];
    timer: number;
};
interface DraftGame {
    [Player.One]: {
        picks: Pokemon[];
        bans: Pokemon[];
    };
    [Player.Two]: {
        picks: Pokemon[];
        bans: Pokemon[];
    };
    turnNumber: number;
    history: {
        player: Player;
        action: Action;
        pokemon: Pokemon;
    }[];
    rules: Rules;
}
export declare const createDraftGame: () => DraftGame;
export {};
