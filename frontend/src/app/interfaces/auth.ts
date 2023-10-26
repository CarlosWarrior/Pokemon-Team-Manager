export interface Credentials{
    email: string,
    password: string,
}
export interface Registration{
    name: string,
    email: string,
    password: string,
}
export interface Entity{
    _id: string,
    name: string,
    email: string,
    role: string,
}
export interface Session{
    token: string,
    user: Entity,
}