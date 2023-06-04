// transactions.module.ts

import { Module } from '@nestjs/common';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';
import { DatabasesModule } from 'app/databases/databases.module';

@Module({
  imports: [DatabasesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
