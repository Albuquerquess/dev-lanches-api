import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}
  @Post()
  async adicoinarItemAoCarrinho(@Res() response, @Body() itemCarrinho: Carrinho): Promise<CarrinhoDocument> {
    console.log({itemCarrinho})
    const novoItemAdicionadoAoCarrinho = await this.carrinhoService.adicionarItemAoCarrinho(itemCarrinho);
    return response.status(HttpStatus.CREATED).json(novoItemAdicionadoAoCarrinho)
  }

  @Get()
  async listarItensDoCarrinho(): Promise<Array<CarrinhoDocument>> {  
    const itensDoCarrinho = await this.carrinhoService.listarItensDoCarrinho();
    return itensDoCarrinho
  }
  @Delete(':_id')
  async deletaItemDoCarrinho(@Param('_id') _id): Promise<boolean> {  
    console.log({_id})
    const itensDoCarrinho = await this.carrinhoService.deletaItemDoCarrinho(_id);
    return itensDoCarrinho
  }
}
