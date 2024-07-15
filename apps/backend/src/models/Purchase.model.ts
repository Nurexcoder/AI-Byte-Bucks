import { Schema, model, Document, Types } from 'mongoose';

export interface IPurchase extends Document {
    id: number;
    token_purchased: number;
    total_amount: number;
    purchases_date: Date;
  }
  
  const purchaseSchema = new Schema<IPurchase>({
    id: { type: Number, required: true, unique: true },
    token_purchased: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    purchases_date: { type: Date, required: true }
  });
  
  export const Purchase = model<IPurchase>('Purchase', purchaseSchema);