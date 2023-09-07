import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Token {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  side: string;

  @Prop({ required: true, unique: true })
  refreshToken: string;

  @Prop({ required: true })
  expiredAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
