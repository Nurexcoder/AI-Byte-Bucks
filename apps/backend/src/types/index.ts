export type User = {
    id?: number
    name: string
    email: string
    userType: UserType
    password: string
}
export enum UserType {
    USER = "USER",
    ADMIN = "ADMIN"
}