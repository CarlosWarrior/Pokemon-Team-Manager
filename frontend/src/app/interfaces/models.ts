export interface TypeModel {
    _id?: string,
    name: string;
    color: string;
    image: string;
    teracrystalImage: string;
}

export interface AbilityModel {
    _id?: string,
    name: string;
    effect: string;
}

export enum MoveCategory{
    Physical = "physical",
    Special = "special",
    Status = "status",
}
export interface MoveModel {
    _id?: string,
    name: String,
    type: String,
    category: MoveCategory,
    power: Number,
    accuracy: Number,
    pp: Number,
    effect: String,
}