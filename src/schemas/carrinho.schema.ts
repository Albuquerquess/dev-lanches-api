import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarrinhoDocument = HydratedDocument<Carrinho>;

@Schema()
export class Carrinho {
  @Prop({type: String, required: true})
  nome: string;

  @Prop({type: Number, required: true, min: 0.1})
  valor: number;
}

export const CarrinhoSchema = SchemaFactory.createForClass(Carrinho);