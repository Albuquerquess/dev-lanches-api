import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type CarrinhoDocument = HydratedDocument<Carrinho>;

@Schema()
export class Carrinho {
  @Prop({type: String, required: true})
  nome: string;

  @Prop({type: Number, required: true, min: 0.1})
  valor: number;

  @Prop({default: now()})
  criado_em: Date;

  @Prop({default: now()})
  atualizado_em: Date;
}

export const CarrinhoSchema = SchemaFactory.createForClass(Carrinho);