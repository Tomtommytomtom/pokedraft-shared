export const numberEnumKeys = <T extends Object>(e: T): (keyof T)[] => {
  return Object.keys(e).filter(k => typeof e[k as keyof T] === "number") as (keyof T)[]
}

export const numberEnumValues = <T>(e: T) => {
  const keys = numberEnumKeys(e);
  return keys.map(k => e[k as keyof T]);
}