import { Pokemon, SmogonTier } from "./pokemon/pokemon"

export enum Player {
  One = "PLAYER_1",
  Two = "PLAYER_2"
}

const playerMapping = { 
  [Player.One]: 'Player 1',
  [Player.Two]: 'Two'
}

const playerToText = (p: Player) => {
return playerMapping[p]
}


export enum Action {
  Pick = "ACTION_PICK",
  Ban = "ACTION_BAN"
}

const actionMapping = {
    [Action.Pick]: {
      noun: 'Pick',
      verbPast: 'picked'
    },
    [Action.Ban]: {
      noun: 'Ban',
      verbPast: 'banned'
    },
  }

const actionToText = (a: Action) => {
  return actionMapping[a].verbPast
}

export const turnMapping: Record<string,Turn> = {
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
}

export const defaultTurnOrder: string[] = [
  '1B', //1
  '2P', //2
  '1P', //3
  '2B', //4
  '1B', //5
  '2P', //6
  '1P', //7
  '2B', //8
  '1B', //9
  '2P', //10
  '1P', //11
  '2B', //12
  '1B', //13
  '2P', //14
  '1P', //15
  '2B', //16
  '1B', //17
  '2P', //18
  '1B', //19
  '2B', //20
  '1P', //21
  '2B', //22
  '1P', //23
  '2P', //24
]

export const turns = defaultTurnOrder.map(t => turnMapping[t])

const createArrayIndexReducer = <T>(isCondition: (element: T) => boolean) => (arr: number[], element: T, index: number) => {
  if(isCondition(element)){
    return arr.concat(index)
  } else {
    return arr
  }
}

const playerOneReducer = createArrayIndexReducer((e:string) => e.includes('1'))
const playerTwoReducer = createArrayIndexReducer((e:string) => e.includes('2'))

export const playerOneArray = defaultTurnOrder.reduce(playerOneReducer,[] as number[])
export const playerTwoArray = defaultTurnOrder.reduce(playerTwoReducer,[] as number[])

export interface Turn {
  player: Player,
  action: Action,
  pokemon?: Pokemon
}

export const turnToText = (turn: Turn) => {
  return [playerToText(turn.player),actionToText(turn.action),turn.pokemon?.name].join(" ")
}

interface Rules {
  pickPattern: Turn[],
  allowedPicks: [SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier],
  timer: number,
}

const allowedPicks = new Array(6).fill(SmogonTier.OU) as [SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier]

export const createStandardRules = () => ({
  pickPattern: defaultTurnOrder.map(t => turnMapping[t]),
  allowedPicks,
  timer: 100
})

export interface DraftGame {
  [Player.One]: {
    picks: Pokemon[],
    bans: Pokemon[]
  },
  [Player.Two]: {
    picks: Pokemon[],
    bans: Pokemon[]
  },
  turnNumber: number,
  history: {
    player: Player,
    action: Action,
    pokemon: Pokemon
  }[],
  rules: Rules
}

export const createDraftGame = (rules: Rules): DraftGame => ({
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
  rules
})