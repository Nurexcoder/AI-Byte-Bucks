import { Schema, model, Document, Types } from 'mongoose';
export interface IPayment extends Document {
    id: number;
    app_name: string;
    service_used: string;
    tokens_used: number;
    payment_date: string;
  }
  
  const paymentSchema = new Schema<IPayment>({
    id: { type: Number, required: true, unique: true },
    app_name: { type: String, required: true },
    service_used: { type: String, required: true },
    tokens_used: { type: Number, required: true },
    payment_date: { type: String, required: true }
  });
  
  export const Payment = model<IPayment>('Payment', paymentSchema);