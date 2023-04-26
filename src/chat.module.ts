import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS-Chat-API')
    .setDescription('A simple chat application API')
    .setVersion('1.0')
    .addTag('Chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
