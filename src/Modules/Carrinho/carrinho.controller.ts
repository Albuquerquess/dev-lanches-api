import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Carrinho, CarrinhoDocument } from 'src/schemas/carrinho.schema';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  // @Get()
  // listaItensCarrinho(): string {
  //   return this.carrinhoService.listaItensCarrinho();
  // }
  @Post()
  async adicoinarItemAoCarrinho(@Res() response, @Body() itemCarrinho: Carrinho): Promise<CarrinhoDocument> {
    console.log({itemCarrinho})
    const novoItemAdicionadoAoCarrinho = await this.carrinhoService.adicionarItemAoCarrinho(itemCarrinho);
    return response.status(HttpStatus.CREATED).json(novoItemAdicionadoAoCarrinho)
  }
}
