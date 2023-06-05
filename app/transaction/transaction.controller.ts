import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Transaction } from '.prisma/client';
import { TransactionsService } from './transaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':clientId/:walletAddress/:currencyType')
  async getTransaction(
    @Param('clientId') clientId: number,
    @Param('walletAddress') walletAddress: string,
    @Param('currencyType') currencyType: string,
  ): Promise<Transaction | null> {
    return this.transactionsService.getTransactionByClientIdWalletAddressAndCurrencyType(
      clientId,
      walletAddress,
      currencyType,
    );
  }

  @Post()
  async createTransaction(
    @Body('clientId') clientId: number,
    @Body('walletAddress') walletAddress: string,
    @Body('currencyType') currencyType: string,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(
      clientId,
      walletAddress,
      currencyType,
    );
  }
}
