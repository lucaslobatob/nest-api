import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/* 
  - src/app.module.ts: Módulo principal da aplicação;
  - src/app.controller.ts: Define as rotas e lida com as requisições HTTP;
  - src/app.service.ts: Serviço que contém a lógica de negócio;
*/

//Arquivo que inicia o Projeto NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
