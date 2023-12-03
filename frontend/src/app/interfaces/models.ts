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
export enum MoveTarget{
    AllOpponents = "all-opponents", 
    User = "user", 
    SelectedPokemon = "selected-pokemon", 
    RandomOpponent = "random-opponent", 
    UsersField = "users-field", 
    SpecificMove = "specific-move", 
    EntireField = "entire-field", 
    Ally = "ally", 
    AllOtherPokemon = "all-other-pokemon", 
    UserAndAllies = "user-and-allies", 
    OpponentsField = "opponents-field", 
    SelectedPokemonMeFirst = "selected-pokemon-me-first", 
    AllPokemon = "all-pokemon", 
    UserOrAlly = "user-or-ally", 
    AllAllies = "all-allies", 
    FaintingPokemon = "fainting-pokemon", 
}
export interface MoveModel {
    _id?: string
    name: string
    type: string
    category: MoveCategory
    target: MoveTarget
    power: number
    accuracy: number
    pp: number
    priority: number
    effect?: string
    effect_chance?: number
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

export interface SlotSetupData{
    typeNames: string[]
    itemNames: string[]
    abilityNames: string[]
    moveNames: string[]
}
export enum PokemonGender{
    Male = 'male', 
    Female = 'female',
    None = 'none',
}
export interface PokemonSlot{
    pokemon: PokemonModel
    order: number
    gender: PokemonGender
    level: number
    tera_type: string
    moves: string[]
    ability: string
    evs: Stats
    ivs: Stats
    item: string

}
export interface TeamModel{
    _id?: string
    name: string
    slots: [PokemonSlot]
}


interface Rank{
    [key: string]: number
}
interface TeamStates {
    [teamId: string]: {
        attackAdvantage: {
            [type: string]: number;
        };
        defenseAdvantage: {
            [type: string]: number;
        };
        defenseWeakness: {
            [type: string]: number;
        };
    };
}
export interface Ranking{
    teamsCoverage: Rank,
    teamsDefense: Rank,
    teamsCoverageRanking: [string]
    teamsDefenseRanking: [string]
    teamsStates: TeamStates
}