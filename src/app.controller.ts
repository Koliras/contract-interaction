import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/balance/:wallet')
  getBalance(@Param('wallet') wallet: string) {
    return this.appService.getBalance(wallet);
  }

  @Post('admin/add')
  addAdmin(@Body() body: { address: string }) {
    return this.appService.addAdmin(body.address);
  }

  @Post('admin/remove')
  removeAdmin(@Body() body: { address: string }) {
    return this.appService.removeAdmin(body.address);
  }
}
