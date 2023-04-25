import { Injectable } from '@nestjs/common';
import { Message } from './message.dto';
import { Room } from './room.dto';
import { User } from './user.dto';

@Injectable()
export class ChatService {
  private rooms: Map<string, Room> = new Map();

  getRooms(): Room[] {
    const rooms = Array.from(this.rooms.values());
    for (const room of rooms) {
      room.users = Array.from(room.users);
    }
    return rooms;
  }

  createRoom(name: string): Room {
    const room: Room = { name, users: new Set(), messages: [] };
    this.rooms.set(name, room);
    return room;
  }

  addUserToRoom(roomName: string, user: User): void {
    const room = this.rooms.get(roomName);
    if (!room) {
      throw new Error('Room not found');
    }
    if (Array.isArray(room.users)) {
      room.users.push(user);
    } else {
      room.users.add(user);
    }
    this.rooms.set(roomName, room);
  }

  sendMessage(roomName: string, message: Message): void {
    const room = this.rooms.get(roomName);
    if (!room) {
      throw new Error('Room not found');
    }
    room.messages.push(message);
  }

  getLatestMessages(roomName: string, limit?: number): Message[] {
    const room = this.rooms.get(roomName);
    if (!room) {
      throw new Error('Room not found');
    }
    if (!limit) {
      return room.messages;
    }
    const startIndex = Math.max(room.messages.length - limit, 0);
    const endIndex = room.messages.length;
    return room.messages.slice(startIndex, endIndex);
  }
}
