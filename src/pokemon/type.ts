import { Pokemon } from "./pokemon"

export enum PokemonType {
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
  Fairy = "Fairy",
}

export const pokemonTypeMapping: Record<PokemonType,any> = {
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
}


type Effectiveness = 2 | 1 | 0 | 0.5;

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
]

const weaknessChart: Record<PokemonType,Effectiveness[]> = ({
                          //No,Fi,Fl,Po,Gr,Ro,Bu,Gh,St,Fi,Wa,Gr,El,Ps,Ic,Dr,Da,Fa
  [PokemonType.Normal]:    [ 1, 1, 1, 1, 1,.5, 1, 0,.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [PokemonType.Fighting]:  [ 2, 1,.5,.5, 1, 2,.5, 0, 2, 1, 1, 1, 1,.5, 2, 1, 2,.5],
  [PokemonType.Flying]:    [ 1, 2, 1, 1, 1,.5, 2, 1,.5, 1, 1, 2,.5, 1, 1, 1, 1, 1],
  [PokemonType.Poison]:    [ 1, 1, 1,.5,.5,.5, 1,.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [PokemonType.Ground]:    [ 1, 1, 0, 2, 1, 2,.5, 1, 2, 2, 1,.5, 2, 1, 1, 1, 1, 1],
  [PokemonType.Rock]:      [ 1,.5, 2, 1,.5, 1, 2, 1,.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  [PokemonType.Bug]:       [ 1,.5,.5,.5, 1, 1, 1,.5,.5,.5, 1, 2, 1, 2, 1, 1, 2,.5],
  [PokemonType.Ghost]:     [ 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1,.5, 1],
  [PokemonType.Steel]:     [ 1, 1, 1, 1, 1, 2, 1, 1,.5,.5,.5, 1,.5, 1, 2, 1, 1, 2],
  [PokemonType.Fire]:      [ 1, 1, 1, 1, 1,.5, 2, 1, 2,.5,.5, 2, 1, 1, 2, 1, 1, 1],
  [PokemonType.Water]:     [ 1, 1, 1, 1, 2, 2, 1, 1, 1, 2,.5,.5, 1, 1, 1,.5, 1, 1],
  [PokemonType.Grass]:     [ 1, 1,.5,.5, 2, 2,.5, 1,.5,.5, 2,.5, 1, 1, 1,.5, 1, 1],
  [PokemonType.Electric]:  [ 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2,.5,.5, 1, 1,.5, 1, 1],
  [PokemonType.Psychic]:   [ 1, 2, 1, 2, 1, 1, 1, 1,.5, 1, 1, 1, 1,.5, 1, 1, 0, 1],
  [PokemonType.Ice]:       [ 1, 1, 2, 1, 2, 1, 1, 1,.5,.5,.5, 2, 1, 1,.5, 2, 1, 1],
  [PokemonType.Dragon]:    [ 1, 1, 1, 1, 1, 1, 1, 1,.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [PokemonType.Dark]:      [ 1,.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1,.5,.5],
  [PokemonType.Fairy]:     [ 1, 2, 1,.5, 1, 1, 1, 1,.5,.5, 1, 1, 1, 1, 1, 2, 2, 1],
})                        //No,Fi,Fl,Po,Gr,Ro,Bu,Gh,St,Fi,Wa,Gr,El,Ps,Ic,Dr,Da,Fa

export const calculateWeaknesses = (types: PokemonType[]): Record<PokemonType,Weakness> => {
  let result = {} as Record<PokemonType,Weakness>
  Object.entries(weaknessChart).forEach(([type, row]: [string,Effectiveness[]]) => {
    const indices = types.map((t) => order.indexOf(t))
    result[type as PokemonType] = indices.reduce((res, i) => res * row[i],1 as number) as Weakness
  })
  return result
}

export enum Weakness {
  Immune = 0,
  VeryResistant = 0.25,
  Resistant = 0.5,
  Neutral = 1,
  Weak = 2,
  VeryWeak = 4,
}


const weaknessMap: Record<Weakness,{ name: string }> = {
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
}

const mapWeaknessToEnum = (weakness: Record<PokemonType,Weakness>): Record<Weakness,PokemonType[]> => {
  const result = {} as Record<Weakness,PokemonType[]>
  Object.entries(weakness).forEach(([type,value]) => {
    if(!result[value]){
      result[value] = [type as PokemonType]
    } else {
      result[value].push(type as PokemonType)
    }
  })
  return result
}

export const getWeakness = (pokemon: Pokemon): Record<Weakness,PokemonType[]> => {
  const weaknesses = calculateWeaknesses(pokemon.types)
  return mapWeaknessToEnum(weaknesses)
}

export const getWeaknessName = (weakness: Weakness): string => {
  return weaknessMap[weakness].name
}