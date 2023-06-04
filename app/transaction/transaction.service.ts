import { Injectable } from '@nestjs/common';
import { Transaction } from '.prisma/client';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { PrismaDatabaseService } from 'app/databases/prisma-database.service';

@Injectable()
export class TransactionsService {
  private readonly eventBusClient: ClientProxy;

  constructor(private readonly prisma: PrismaDatabaseService) {
    this.eventBusClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'transaction_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async getTransactionByClientIdWalletAddressAndCurrencyType(
    clientId: number,
    walletAddress: string,
    currencyType: string,
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: {
        clientId_walletAddress_currencyType: {
          clientId,
          walletAddress,
          currencyType,
        },
      },
    });
  }

  async createTransaction(
    clientId: number,
    walletAddress: string,
    currencyType: string,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        clientId,
        walletAddress,
        currencyType,
      },
    });

    const event = {
      clientId,
      walletAddress,
      currencyType,
      transactionId: transaction.id,
    };

    await this.eventBusClient.emit('transaction_received', event).toPromise();

    return transaction;
  }
}
