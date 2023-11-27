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
  async finalizarCompra(): Promise<any> {
    const itensDoCarrinho = await this.carrinhoModel.find()
    const a = itensDoCarrinho.reduce((a) => {
      console.log(a)
      return a
    })
  //  const valorTotal = 
   const compraFinalizada = {
    
   }

  }
  async deletaItemDoCarrinho(nome: string): Promise<boolean> {
   const itemDeletado = await this.carrinhoModel.deleteOne({nome})

   return itemDeletado.deletedCount === 1
  }
}
