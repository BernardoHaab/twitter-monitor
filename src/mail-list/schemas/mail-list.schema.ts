import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class MailList {
  @Prop({ type: SchemaTypes.ObjectId })
  id: string;

  @Prop({ type: [String] })
  emails: string[];
}

export type MailListDocument = MailList & Document;

export const MailListSchema = SchemaFactory.createForClass(MailList);
