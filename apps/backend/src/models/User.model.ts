import { Schema, model, Document, Types } from 'mongoose';
import { User as UserType } from '../types';

// User schema and interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  wallet_id: Types.ObjectId;
  user_type: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet_id: { type: Schema.Types.ObjectId, ref: 'Wallet', required: false },
  user_type: { type: String, required: true }
});
const User = model<IUser>('User', userSchema);
export default User;

export const addUser = async (user: UserType) => {
  return await User.create(user);
}

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }); 
}
