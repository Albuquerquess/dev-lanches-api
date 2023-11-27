import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoService } from './carrinho.service';

const CONTROLER_NAME = 'carrinho'

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
    console.log({itemCarrinho})
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

  @ApiOperation({ summary: 'Exclui um item do carrinho.', parameters: [{name: 'nome', in: 'path'}] })
  @Delete(':nome')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Item excluído.',
    type: Carrinho,
  })
  async deletaItemDoCarrinho(@Res() response, @Param('nome') nome): Promise<boolean> {  

    const itensDoCarrinho = await this.carrinhoService.deletaItemDoCarrinho(nome);
    return response.status(HttpStatus.NO_CONTENT).json(itensDoCarrinho)
  }

  @ApiOperation({ summary: 'Finalizar compra' })
  @ApiProperty({})
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item adicionado.',
    type: Carrinho,
  })
  @Post()
  async finalizarCompra(@Res() response): Promise<any> {
    const compraFinalizada = await this.carrinhoService.finalizarCompra();
    return response.status(HttpStatus.CREATED).json(compraFinalizada)
  }
  @Get('healthCheck')
  async healthCheck() {
    return {ok: true}
  }
}
