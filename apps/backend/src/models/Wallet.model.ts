import { Schema, model, Document, Types } from 'mongoose';
export interface IWallet extends Document {
  id: number;
  tokens: number;
  purchase_ids: Types.ObjectId[];
  payment_ids: Types.ObjectId[];
}

const walletSchema = new Schema<IWallet>({
  id: { type: Number, required: true, unique: true },
  tokens: { type: Number, default: 30 },
  purchase_ids: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  payment_ids: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
});

export const Wallet = model<IWallet>('Wallet', walletSchema);