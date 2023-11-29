import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoHistorico, CarrinhoHistoricoDocument } from 'src/schemas/carrinho_historico.schema';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectModel(Carrinho.name)
    private carrinhoModel: Model<CarrinhoDocument>,
    @InjectModel(CarrinhoHistorico.name)
    private carrinhoHistoricoModel: Model<CarrinhoHistoricoDocument>) { }

  async adicionarItemAoCarrinho(itemCarrinho: Carrinho): Promise<CarrinhoDocument> {
    const itemAdicionado = await this.carrinhoModel.create(itemCarrinho)

    return itemAdicionado
  }
  async listarItensDoCarrinho(): Promise<Array<CarrinhoDocument>> {
    return await this.carrinhoModel.find()
  }

  async finalizarCompra(): Promise<any> {
    const itensDoCarrinho = await this.carrinhoModel.find()

    if (!itensDoCarrinho.length) throw new HttpException('Não existem itens no carirnho de compras.', HttpStatus.BAD_REQUEST)
    
    const valorTotal = itensDoCarrinho.reduce((acc, itemDoCarrinho) => acc + itemDoCarrinho.valor, 0)

    await this.carrinhoHistoricoModel.create({ carrinho: itensDoCarrinho }) // Guarda histórico do carrinho para uso no dashboard
    await this.carrinhoModel.deleteMany({}) //Carrinho limpo

    return { valorTotal, itensDoCarrinho }

  }
  async deletaItemDoCarrinho(nome: string): Promise<boolean> {
    const itemDeletado = await this.carrinhoModel.deleteOne({ nome })

    return itemDeletado.deletedCount === 1
  }
}
