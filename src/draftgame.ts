import { Pokemon, SmogonTier, mapStringToTier, stringTier } from "./pokemon/pokemon"

export enum Player {
  One = "PLAYER_1",
  Two = "PLAYER_2"
}

export const playerMapping = { 
  [Player.One]: 'Player 1',
  [Player.Two]: 'Two'
}

export const playerToText = (p: Player) => {
return playerMapping[p]
}


export enum Action {
  Pick = "ACTION_PICK",
  Ban = "ACTION_BAN"
}

export const actionMapping = {
    [Action.Pick]: {
      noun: 'Pick',
      verbPast: 'picked'
    },
    [Action.Ban]: {
      noun: 'Ban',
      verbPast: 'banned'
    },
  }

export const actionToText = (a: Action) => {
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

export const createArrayIndexReducer = <T>(isCondition: (element: T) => boolean) => (arr: number[], element: T, index: number) => {
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

export interface Rules {
  pickPattern: Turn[],
  allowedPicks: [SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier],
  timer: number,
}

export const allowedPicks = new Array(6).fill(SmogonTier.OU) as [SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier,SmogonTier]

export const createStandardRules = () => ({
  pickPattern: defaultTurnOrder.map(t => turnMapping[t]),
  allowedPicks,
  timer: 100
})

export interface IDraftGame {
  turnNumber: number,
  [Player.One]: {
    [Action.Pick]: Pokemon[],
    [Action.Ban]: Pokemon[]
  },
  [Player.Two]: {
    [Action.Pick]: Pokemon[],
    [Action.Ban]: Pokemon[]
  },
  allowed: {
    [Player.One]: {
      [Action.Pick]: SmogonTier[],
      [Action.Ban]: SmogonTier[]
    },
    [Player.Two]: {
      [Action.Pick]: SmogonTier[],
      [Action.Ban]: SmogonTier[]
    },
  }
  history: Turn[],
  rules: Rules
}

export class InvalidTurnError extends Error {
  constructor(turn: Turn){
    super()
    this.message = `InvalidTurn: ${turn.player} ${turn.action}`
  }
}

export class NoPokemonError extends InvalidTurnError {
  constructor(turn: Turn){
    super(turn)
    this.message += `NoPokemon: No Pokemon has been picked or banned`
  }
}


export class PokemonBannedError extends InvalidTurnError {
  constructor(turn: Turn){
    super(turn)
    this.message = `PokemonBanned: ${turn?.pokemon} has been banned`
  }
}

export class PokemonPickedError extends InvalidTurnError {
  constructor(turn: Turn){
    super(turn)
    this.message = `PokemonPicked: ${turn?.pokemon} has already been picked`
  }
}

export class InvalidActionError extends InvalidTurnError {
  constructor(turn: Turn, actualTurn: Turn){
    super(turn)
    this.message += `-> InvalidAction: ${actualTurn.player} tried to ${actualTurn.action}, not ${turn.action}`
  }
}

export class InvalidPlayerError extends InvalidTurnError {
  constructor(turn: Turn, actualTurn: Turn){
    super(turn)
    this.message += `-> InvalidPlayer: expected player to make a move ${turn.player}, actual player that tried ${actualTurn.player}`
  }
}

export class InvalidTierError extends InvalidTurnError {
  constructor(turn: Turn, allowed: SmogonTier[]){
    super(turn)
    this.message = `InvalidTierError ${turn.pokemon?.name} from tier ${mapStringToTier(turn.pokemon?.smogonTier as stringTier)} not allowed, allowed: ${allowed}`
  }
}

export class DraftGame {
  public history: Turn[] = [];
  public turnNumber: number = 0

  public allowed: {
    [Player.One]: {
      [Action.Ban]: SmogonTier[],
      [Action.Pick]: SmogonTier[]
    },
    [Player.Two]: {
      [Action.Ban]: SmogonTier[],
      [Action.Pick]: SmogonTier[]
    },
  }

  private rules: Rules
  constructor(rules: Rules){
    this.rules = rules
    this.allowed = {
      [Player.One]: {
        [Action.Pick]: [...rules.allowedPicks],
        [Action.Ban]: [...rules.allowedPicks],
      },
      [Player.Two]: {
        [Action.Pick]: [...rules.allowedPicks],
        [Action.Ban]: [...rules.allowedPicks],
      }
    }
  }

  private getBans = (): Pokemon[] => {
    return this.history.filter(turn => turn.action === Action.Ban).map(turn => turn?.pokemon) as Pokemon[]
  }

  private getPicks = (): Pokemon[] => {
    return this.history.filter(turn => turn.action === Action.Pick).map(turn => turn?.pokemon) as Pokemon[]
  }

  private hasPokemonBeenBanned = (pokemon: Pokemon) => {
    return this.getBans().includes(pokemon)
  }

  private hasPokemonBeenPicked = (pokemon: Pokemon) => {
    return this.getPicks().includes(pokemon)
  }

  private getAllowedRef = (turn: Turn) => {
    return this.allowed[turn.player][turn.action]
  }

  private isValidPickOrBan = (turn: Turn) => {
    const pokemon = turn.pokemon as Pokemon
    const action = turn.action    
    if(this.hasPokemonBeenBanned(pokemon)){
      throw new PokemonBannedError(turn)
    }
    if(this.hasPokemonBeenPicked(pokemon)){
      throw new PokemonPickedError(turn)
    }
    if(!this.isValidTier(turn)){
      return false
    }
    return true
  }

  private isValidTier = (turn: Turn) => {
    const tier = mapStringToTier(turn.pokemon?.smogonTier as stringTier)
    const allowed = this.getAllowedRef(turn)
    if(allowed.some(t => t >= tier)){
      return true
    } else {
      throw new InvalidTierError(turn,allowed)
    }
  }

  private indexOfSmallestTier = (turn: Turn) => {
    const tier = mapStringToTier(turn.pokemon?.smogonTier as stringTier)
    const allowed = this.getAllowedRef(turn)
    let resultIndex = -1;
    for(let i = 0; i < allowed.length; i++){
      if(allowed[i] < allowed[resultIndex] && allowed[i] >= tier){
        resultIndex = i
      }
    }
    return resultIndex
  }


  public isValidTurn = (turn: Turn): boolean =>  {
    const turnNumber = this.turnNumber
    const nextTurn = this.rules.pickPattern[turnNumber]
    if(turn.action !== nextTurn.action){
      throw new InvalidActionError(nextTurn,turn)
    }
    if(turn.player !== nextTurn.player){
      throw new InvalidPlayerError(nextTurn,turn)
    }
    if(!turn.pokemon){
      throw new NoPokemonError(turn)
    }
    if(this.isValidPickOrBan(turn)){
      return true
    }
    return false
  }

  public doTurn = (turn: Turn) => {
    if(!this.isValidTurn(turn)){
      return false
    }
    this.history.push(turn)
    const index = this.indexOfSmallestTier(turn)
    this.getAllowedRef(turn).splice(index,1)
    this.turnNumber = this.turnNumber + 1;
    return true
  }

  public isDone = () => {
    return this.history.length === this.rules.pickPattern.length
  }

  private getPokemons = (a: Action,p: Player) => {
    return this.history.filter(t => t.action === a && t.player === p).map(t => t?.pokemon) as Pokemon[]
  }

  public serialize = (): IDraftGame => {
    const playerOnePicks = this.getPokemons(Action.Pick, Player.One)
    const playerOneBans = this.getPokemons(Action.Ban, Player.One)
    const playerTwoPicks = this.getPokemons(Action.Pick, Player.Two)
    const playerTwoBans = this.getPokemons(Action.Ban, Player.Two)

    return {
      turnNumber: this.turnNumber,
      [Player.One]: {
        [Action.Ban]: playerOneBans,
        [Action.Pick]: playerOnePicks,
      },
      [Player.Two]: {
        [Action.Ban]: playerTwoBans,
        [Action.Pick]: playerTwoPicks,
      },
      allowed: this.allowed,
      history: this.history,
      rules: this.rules
    }
  }
}