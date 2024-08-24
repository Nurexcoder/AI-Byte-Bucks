
export type UserBase = {
    name: string
    email: string
    user_type: UserType
}
export enum UserType {
    USER = "USER",
    ADMIN = "ADMIN"
}

