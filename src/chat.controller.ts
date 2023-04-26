import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './message.dto';
import { Room } from './room.dto';
import { User } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  getRoot(): string {
    return 'Welcome to the chat API';
  }

  @Get('/room')
  getRooms(): Room[] {
    return Array.from(this.chatService.getRooms().values());
  }

  @Post('/room')
  createRoom(@Body('name') name: string): Room {
    return this.chatService.createRoom(name);
  }

  @Post('/room/:roomName/user')
  addUserToRoom(@Param('roomName') roomName: string, @Body() user: User): void {
    this.chatService.addUserToRoom(roomName, user);
  }

  @Post('/room/:roomName/message')
  sendMessage(
    @Param('roomName') roomName: string,
    @Body() message: Message,
  ): void {
    this.chatService.sendMessage(roomName, message);
  }

  @Get('/room/:roomName/messages')
  getLatestMessages(
    @Param('roomName') roomName: string,
    @Query('limit') limit?: number,
  ): Message[] {
    return this.chatService.getLatestMessages(roomName, limit);
  }
}
