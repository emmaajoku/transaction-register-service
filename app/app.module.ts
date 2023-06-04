import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsModule } from './transaction/transaction.module';
import { PrismaDatabaseService } from './databases/prisma-database.service';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [
    DatabasesModule,
    TransactionsModule,
    ClientsModule.register([
      {
        name: 'TRANSACTION_EVENT_BUS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'transaction_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [],
})
export class AppModule {}
