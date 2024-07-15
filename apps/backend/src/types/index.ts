export type User = {
    id?: number
    name: string
    email: string
    user_type: UserType
    password: string
}
export enum UserType {
    USER = "USER",
    ADMIN = "ADMIN"
}