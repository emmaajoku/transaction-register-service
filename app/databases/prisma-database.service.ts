import { PrismaClient } from '@prisma/client';
import {
  INestApplication,
  INestMicroservice,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class PrismaDatabaseService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async enableShutdownHooks(
    app: INestMicroservice | INestApplication,
  ): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
