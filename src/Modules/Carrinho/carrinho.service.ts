import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';

@Injectable()
export class CarrinhoService {
  constructor(@InjectModel(Carrinho.name) private carrinhoModel: Model<CarrinhoDocument>) {}
  async adicionarItemAoCarrinho(itemCarrinho: Carrinho ): Promise<CarrinhoDocument> {
   const itemAdicionado = await this.carrinhoModel.create({id: 1, nome: 'Item-1', valor: 3.7})

   return itemAdicionado
  }
}
