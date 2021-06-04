type StringIndexable<T> = { [key:string]: T }

export interface Stats extends StringIndexable<number> {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export const statsKeys = ["hp","atk","def","spa","spd","spe"]

export const statsMapping: Record<keyof Stats,any> = {
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
} 

export const getStatColor = (value: number) => {
  if(value < 40){
    return '#cc0000'
  }
  if(value < 60) {
    return '#cc3000'
  }
  if(value < 80){
    return '#cc7700'
  }
  if(value < 100){
    return '#3dcc00'
  }
  if(value < 130){
    return '#00cc88'
  }
  return '#00ccad'
}