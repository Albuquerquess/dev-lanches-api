import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrinho, CarrinhoSchema } from 'src/schemas/carrinho.schema';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoHistorico, CarrinhoHistoricoSchema } from 'src/schemas/carrinho_historico.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dev-lanches:ovKmPtWUIvtRLEYJ@dev-lanches.56a8hpq.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Carrinho.name, schema: CarrinhoSchema }]),
    MongooseModule.forFeature([{ name: CarrinhoHistorico.name, schema: CarrinhoHistoricoSchema }])
  ],
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
})
export class CarrinhoModule { }
