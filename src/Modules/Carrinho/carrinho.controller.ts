import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoService } from './carrinho.service';

const CONTROLER_NAME = 'carrinho'


interface IResponseFinalizarCompra {
  valorTotal: number,
  itensDoCarrinho: Array<Carrinho>
}

@Controller(CONTROLER_NAME)
@ApiTags(CONTROLER_NAME)
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}


  @ApiOperation({ summary: 'Adiciona um item ao carrinho.' })
  @ApiProperty({})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item adicionado.',
    type: Carrinho,
  })
  @Post()
  async adicoinarItemAoCarrinho(@Res() response, @Body() itemCarrinho: Carrinho): Promise<CarrinhoDocument> {
    const novoItemAdicionadoAoCarrinho = await this.carrinhoService.adicionarItemAoCarrinho(itemCarrinho);
    return response.status(HttpStatus.CREATED).json(novoItemAdicionadoAoCarrinho)
  }
  @ApiOperation({ summary: 'Lista os itens do carrinho.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listagem de itens.',
    type: Array<Carrinho>,
  })
  @Get()
  async listarItensDoCarrinho(): Promise<Array<CarrinhoDocument>> {  
    const itensDoCarrinho = await this.carrinhoService.listarItensDoCarrinho();
    return itensDoCarrinho
  }

  @ApiOperation({ summary: 'Exclui um item do carrinho.', parameters: [{name: 'nome', in: 'query'}] })
  @Delete()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Item excluído.',
    type: Carrinho,
  })
  async deletaItemDoCarrinho(@Res() response, @Query('nome') nome: string): Promise<boolean> {  
    const itensDoCarrinho = await this.carrinhoService.deletaItemDoCarrinho(nome);
    return response.status(HttpStatus.NO_CONTENT).json(itensDoCarrinho)
  }


  @ApiOperation({ summary: 'Finalizar compra' })
  @ApiProperty({})
  @Post('finalizar-compra')
  async finalizarCompra(@Res() response): Promise<IResponseFinalizarCompra> {
    const compraFinalizada = await this.carrinhoService.finalizarCompra();
    return response.status(HttpStatus.OK).json(compraFinalizada)
  }


  @ApiOperation({ summary: 'Relatório de compras' })
  @ApiProperty({})
  @Get('relatorio')
  async relatorioDeCompras(): Promise<any> {
   const relatorio = await this.carrinhoService.relatorio()

   return relatorio
    
  }

  @Get('healthCheck')
  async healthCheck() {
    return {ok: true}
  }
}
