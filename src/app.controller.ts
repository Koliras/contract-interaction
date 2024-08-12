import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/balance/:wallet')
  getBalance(@Param('wallet') wallet: string) {
    return this.appService.getBalance(wallet);
  }
}
