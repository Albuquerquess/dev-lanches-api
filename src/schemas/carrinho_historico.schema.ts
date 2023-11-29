import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { Carrinho } from './carrinho.schema';

export type CarrinhoHistoricoDocument = HydratedDocument<CarrinhoHistorico>;

@Schema()
export class CarrinhoHistorico {
  @Prop({type: [Carrinho], required: true})
  carrinho: Array<Carrinho>;

  @Prop({default: now()})
  criado_em: Date;

  @Prop({default: now()})
  atualizado_em: Date;
}

export const CarrinhoHistoricoSchema = SchemaFactory.createForClass(CarrinhoHistorico);