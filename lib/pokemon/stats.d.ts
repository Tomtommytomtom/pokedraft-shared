declare type StringIndexable<T> = {
    [key: string]: T;
};
export interface Stats extends StringIndexable<number> {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}
export declare const statsKeys: string[];
export declare const statsMapping: Record<keyof Stats, any>;
export declare const getStatColor: (value: number) => "#cc0000" | "#cc3000" | "#cc7700" | "#3dcc00" | "#00cc88" | "#00ccad";
export {};
