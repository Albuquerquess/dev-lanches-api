import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoHistorico, CarrinhoHistoricoDocument } from 'src/schemas/carrinho_historico.schema';
import { Transform } from 'stream';

interface IResponseFinalizarCompra {
  valorTotal: number,
  itensDoCarrinho: Array<Carrinho>
}

interface IRelatorioProps {
  grafico: { [data: string]: number },
  valorTotal: number,
  frequenciaDeCompra: { [key: string]: number }
}

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

  async deletaItemDoCarrinho(nome: string): Promise<boolean> {
    const itemDeletado = await this.carrinhoModel.deleteOne({ nome })

    return itemDeletado.deletedCount === 1
  }

  async finalizarCompra(): Promise<IResponseFinalizarCompra> {
    const itensDoCarrinho = await this.carrinhoModel.find()

    if (!itensDoCarrinho.length) throw new HttpException('Não existem itens no carirnho de compras.', HttpStatus.BAD_REQUEST)

    const valorTotal = itensDoCarrinho.reduce((acc, itemDoCarrinho) => acc + itemDoCarrinho.valor, 0)

    await this.carrinhoHistoricoModel.create({ carrinho: itensDoCarrinho }) // Guarda histórico do carrinho para uso no dashboard
    await this.carrinhoModel.deleteMany({}) //Carrinho limpo

    return { valorTotal, itensDoCarrinho }

  }

  async relatorio(): Promise<IRelatorioProps> {
    const payloadParaEnvio: IRelatorioProps | null = { grafico: {}, valorTotal: 0, frequenciaDeCompra: {} }

    const historicoDoCarrinho = await this.carrinhoHistoricoModel.find().sort('criado_em')

    console.log({ historicoDoCarrinho })

    historicoDoCarrinho.forEach(({ carrinho }) => {
      payloadParaEnvio.valorTotal = payloadParaEnvio.valorTotal + carrinho.reduce((acc, itemDoCarrinho) => acc + itemDoCarrinho.valor, 0)

      carrinho.forEach(itemDoCarrinho => {

        payloadParaEnvio.frequenciaDeCompra[itemDoCarrinho.nome] = (payloadParaEnvio.frequenciaDeCompra[itemDoCarrinho.nome] || 0) + 1

        const dataDoPedido = itemDoCarrinho.criado_em.toISOString().split('T')[0]

        payloadParaEnvio.grafico[dataDoPedido] = (payloadParaEnvio.grafico[dataDoPedido] || 0) + itemDoCarrinho.valor
      })
    })


    return payloadParaEnvio


  }


}
