import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/teste')
  getTeste() {
    return 'Rota de Teste da API';
  }

  @Post('/teste')
  createTeste() {
    return 'Rota Post de Teste da API';
  }
}
