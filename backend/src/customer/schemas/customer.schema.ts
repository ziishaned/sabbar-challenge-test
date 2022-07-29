import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop()
  fullName: string;

  @Prop()
  currentLocation: string;

  @Prop()
  numberOfRides: number;

  @Prop()
  averageRating: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
