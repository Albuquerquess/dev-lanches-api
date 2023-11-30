import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const config = new DocumentBuilder()
  .setTitle('Dev Lanches')
  .setDescription('Documentação da API Dev Lanches')
  .setVersion('1.0')
  .addTag('dev-lanches')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
