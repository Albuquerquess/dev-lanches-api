import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';

@Injectable()
export class CarrinhoService {
  constructor(@InjectModel(Carrinho.name) private carrinhoModel: Model<CarrinhoDocument>) {}
  async adicionarItemAoCarrinho(itemCarrinho: Carrinho ): Promise<CarrinhoDocument> {
   const itemAdicionado = await this.carrinhoModel.create(itemCarrinho)

   return itemAdicionado
  }
  async listarItensDoCarrinho(): Promise<Array<CarrinhoDocument>> {
   return await this.carrinhoModel.find()
  }
  async deletaItemDoCarrinho(_id: string): Promise<boolean> {
   const itemDeletado = await this.carrinhoModel.deleteOne({_id})

   console.log({itemDeletado})

   return itemDeletado.deletedCount === 1
  }
}
