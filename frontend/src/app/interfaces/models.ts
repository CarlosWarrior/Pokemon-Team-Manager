export interface TypeModel {
    _id?: string
    name: string
    color: string
    image: string
    teracrystalImage: string
    attackAdvantage: string[]
    defenseAdvantage: string[]
    defenseWeakness: string[]
}

export interface AbilityModel {
    _id?: string
    name: string
    effect: string
}

export enum MoveCategory{
    Physical = "physical",
    Special = "special",
    Status = "status",
}
export interface MoveModel {
    _id?: string
    name: String
    type: String
    category: MoveCategory
    power: number
    accuracy: number
    pp: number
    priority: number
    effect: String
}

export interface ItemModel {
    _id?: string
    name: string
    description: string
    image: string
}


export interface Stats{
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}
export interface PokemonModel{
    _id?: string
    number: number
    name: string
    image: string
    type1: string
    type2?: string
    moves: string[]
    abilities: string[]
    stats: Stats
}