import { PokemonType } from "./type"
import { Stats } from "./stats"
import { numberEnumKeys, numberEnumValues } from "../enum-helpers"

export interface Ability {
  0: string;
  1?: string;
  H?: string
}

export enum SmogonTier {
  Illegal,
  LC,
  PU,
  NU,
  RU,
  UU,
  OU,
  Ubers
}

export const SmogonTierValues = numberEnumValues(SmogonTier)
export const SmogonTierKeys = numberEnumKeys(SmogonTier)

export const mapSmogonTier: Record<SmogonTier,{ name: string }> = {
  [SmogonTier.Ubers]:{
    name: "Uber"
  },
  [SmogonTier.OU]:{
    name:"OU"
  },
  [SmogonTier.UU]:{
    name:"UU"
  },
  [SmogonTier.RU]:{
    name:"RU"
  },
  [SmogonTier.NU]:{
    name:"NU"
  },
  [SmogonTier.PU]:{
    name:"PU"
  },
  [SmogonTier.LC]:{
    name:"LC"
  },
  [SmogonTier.Illegal]:{
    name:"Illegal"
  },
}

export type stringTier = "LC" | "NFE" | "RUBL" | "PU" | "NU" | "(PU)" | "Illegal" | "UU" | "OU" | "UUBL" | "PUBL" | "RU" | "Uber" | "NUBL"


export const mapStringToTier = (tier: stringTier): SmogonTier => {
  switch(tier){
    case 'Uber':
      return SmogonTier.Ubers
    case 'OU': 
      return SmogonTier.OU
    case 'UU':
    case 'UUBL': 
      return SmogonTier.UU
    case 'RU':
    case 'RUBL': 
      return SmogonTier.PU
    case 'NU':
    case 'NUBL': 
      return SmogonTier.NU
    case 'PU':
    case '(PU)':
    case 'PUBL': 
      return SmogonTier.PU
    case 'LC':
    case 'NFE':
      return SmogonTier.LC
    default:
      return SmogonTier.Illegal
  }
}

export interface Pokemon {
  name: string
  key: string
  id: number
  types: [PokemonType] | [PokemonType,PokemonType]
  abilities: Ability
  smogonTier: string
  stats: Stats
}