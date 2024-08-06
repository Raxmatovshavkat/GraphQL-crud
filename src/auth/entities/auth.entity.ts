import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Field()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Field()
  @Prop({ type: String, required: true })
  password: string;

  @Field()
  @Prop({ type: String, enum: ['client', 'owner', 'supervisor', 'admin'], default: 'client' })
  role: string;

  @Field()
  @Prop({ type: Date, default: () => new Date() })
  created_at: Date;

  @Field()
  @Prop({ type: Date, default: () => new Date() })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
