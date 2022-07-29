import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop()
  name: string;

  @Prop()
  locationLatitude: number;

  @Prop()
  locationLongitude: number;

  @Prop()
  numberOfRides: number;

  @Prop()
  averageRating: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
