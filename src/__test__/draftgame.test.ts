import { DraftGame, Player, Action, Turn, createStandardRules, InvalidActionError } from "../draftgame"
import { Pokemon } from "../pokemon/pokemon"
import pokemons from "./dex.json"

test('DraftGame throws error on invalid action', () => {
  const PickBulbasaur: Turn = {
    action: Action.Pick,
    player: Player.One,
    pokemon: pokemons[0] as Pokemon
  }

  const game = new DraftGame(createStandardRules())

  expect(() => game.isValidTurn(PickBulbasaur)).toThrow(/InvalidAction/)
});

test('DraftGame throws error on invalid player', () => {
  const BanBulbasaur: Turn = {
    action: Action.Ban,
    player: Player.Two,
    pokemon: pokemons[0] as Pokemon
  }

  const game = new DraftGame(createStandardRules())

  expect(() => game.isValidTurn(BanBulbasaur)).toThrow(/InvalidPlayer/)
});

test('DraftGame throws error on banned Pokemon', () => {
  const BanBulbasaur: Turn = {
    action: Action.Ban,
    player: Player.One,
    pokemon: pokemons[0] as Pokemon
  }

  const game = new DraftGame(createStandardRules())

  game.history.push(BanBulbasaur)
  expect(() => game.isValidTurn(BanBulbasaur)).toThrow(/PokemonBanned/)
});

test('DraftGame throws error on picked Pokemon', () => {
  const PickBulbasaur: Turn = {
    action: Action.Pick,
    player: Player.Two,
    pokemon: pokemons[0] as Pokemon
  }

  const game = new DraftGame(createStandardRules())
  game.turnNumber++
  game.history.push(PickBulbasaur)

  expect(() => game.isValidTurn(PickBulbasaur)).toThrow(/PokemonPicked/)
});

test('isDone works', () => {

  const pickPattern = createStandardRules().pickPattern
  console.log(pickPattern)

  const game = new DraftGame(createStandardRules())

  expect(game.isDone()).toBe(false)

  pickPattern.forEach((turn, index) => {
    const turnWithPokemon = { ...turn, pokemon:pokemons[index] as Pokemon}
    console.log(game.allowed)
    game.doTurn(turnWithPokemon)
  })

  expect(game.isDone()).toBe(true)
});



