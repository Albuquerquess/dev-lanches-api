import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarrinhoModule } from './Modules/Carrinho/carrinho.module';


@Module({
  imports: [CarrinhoModule, MongooseModule.forRoot('mongodb+srv://dev-lanches:ovKmPtWUIvtRLEYJ@dev-lanches.56a8hpq.mongodb.net/?retryWrites=true&w=majority')],
  
})
export class AppModule {}
