// localhost.config.ts

import { Transport } from '@nestjs/microservices';

export const localhostConfig = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'transaction_queue',
    queueOptions: {
      durable: true,
    },
  },
};
