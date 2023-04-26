import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [],
  controllers: [ChatController, RedirectController],
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
    .addTag('Redirect')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
