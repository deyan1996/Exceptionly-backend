import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

interface IUser {
  fullName: string;
  email: string;
}

@ObjectType()
@Schema()
export class Booking {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  bookingTitle: string;

  @Field(() => String)
  @Prop({ required: true })
  startDate: string;

  @Field(() => String)
  @Prop({ required: true })
  endDate: string;

  @Field(() => String)
  @Prop(
    raw({
      fullName: { type: String },
      email: { type: String },
    }),
  )
  user: IUser;
}

export type BookingDocument = Booking & Document;

export const BookingSchema = SchemaFactory.createForClass(Booking);
