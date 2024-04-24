import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()
const saltRounds = Number(process.env.SALT_ROUNDS)
const salt = bcrypt.genSaltSync(saltRounds)
export const encryptPassword = (password: string) => {
   const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}