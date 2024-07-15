import { Schema, model, Document, Types } from 'mongoose';
import { User as UserType } from '../types';
import { Wallet } from './Wallet.model';

// User schema and interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  wallet_id: Types.ObjectId;
  user_type: string;
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet_id: { type: Schema.Types.ObjectId, ref: 'Wallet', required: false },
  user_type: { type: String, required: true }
});
export const User = model<IUser>('User', userSchema);

export const addUser = async (user: UserType) => {
    try {
        const wallet = await Wallet.create({  tokens: 30 });
        
        // Create a new wallet associated with the created user
        
        
        // Optionally, link the wallet to the user object for convenience
        console.log('Wallet created:', wallet);
        const createdUser = await User.create({...user, wallet_id: wallet._id});
        console.log('User created:', createdUser);
    
        return createdUser;
      } catch (error) {
        console.error('Error creating user or wallet:', error);
        throw error; // Re-throw for handling at the call site
      }
}

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }); 
}
export const findUserById = async (id: string) => {
  return await User.findById(id); 
}

export const getUserDetailsWithWallet = async (id: Types.ObjectId|undefined) => {
  if(!id) return null
  return await User.findById(id).populate('wallet_id').select('-password').select('-_id').select('-user_type');
}