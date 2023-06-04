import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaDatabaseService } from './databases/prisma-database.service';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';

async function bootstrap(): Promise<any> {

  const app = await NestFactory.create(AppModule);

  // Start the NestJS application
  await app.init();

  // Set the Express server to listen on a specific port
  const port = 3000; // Replace with your desired port
  app.listen(port, () => {
    console.log(`NestJS application is running on port ${port}`);
  });

  app.enableCors({
    allowedHeaders: '*',
    credentials: true,
    origin: '*',
  });

  app.use(helmet());

  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // Docker service name 'localhost'
      queue: 'transactions_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const prismaService = app.get(PrismaDatabaseService);
  await prismaService.enableShutdownHooks(app);

  await microservice.listenAsync();
}

bootstrap().then(() => {
  console.log('Microservice is running');
});
