import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Message } from './message.dto';
import { Room } from './room.dto';
import { User } from './user.dto';

describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService);
  });

  describe('createRoom', () => {
    it('should create a room', () => {
      const room: Room = { name: 'test', users: new Set(), messages: [] };
      jest.spyOn(service, 'createRoom').mockReturnValue(room);
      expect(controller.createRoom('test')).toBe(room);
    });
  });

  describe('addUserToRoom', () => {
    it('should add a user to an existing room', () => {
      const roomName = 'test-room';
      const user: User = { name: 'test-user' };
      service.createRoom(roomName);

      service.addUserToRoom(roomName, user);

      const room = service.getRooms().find((r) => r.name === roomName);
      expect(room).toBeDefined();
      expect(room?.users).toContain(user);
    });

    it('should throw an error when adding a user to a non-existent room', () => {
      const roomName = 'non-existent-room';
      const user: User = { name: 'test-user' };

      expect(() => {
        service.addUserToRoom(roomName, user);
      }).toThrowError('Room not found');
    });

    it('should add multiple users to a room', () => {
      const roomName = 'test-room';
      const users: User[] = [
        { name: 'test-user-1' },
        { name: 'test-user-2' },
        { name: 'test-user-3' },
      ];
      service.createRoom(roomName);

      for (const user of users) {
        service.addUserToRoom(roomName, user);
      }

      const room = service.getRooms().find((r) => r.name === roomName);
      expect(room).toBeDefined();
      for (const user of users) {
        expect(room?.users).toContain(user);
      }
    });
  });

  describe('sendMessage', () => {
    it('should add a message to the room', () => {
      const roomName = 'test-room';
      const message: Message = {
        author: 'Test User',
        text: 'Hello, world!',
        timestamp: new Date(),
      };

      service.createRoom(roomName);
      service.sendMessage(roomName, message);

      const room = service.getRooms().find((r) => r.name === roomName);
      if (room) {
        expect(room.messages).toHaveLength(1);
        expect(room.messages[0]).toEqual(message);
      } else {
        fail('Room not found');
      }
    });

    it('should throw an error if room does not exist', () => {
      const roomName = 'non-existent-room';
      const message: Message = {
        author: 'Test User',
        text: 'Hello, world!',
        timestamp: new Date(),
      };

      expect(() => service.sendMessage(roomName, message)).toThrow(
        'Room not found',
      );
    });
  });

  describe('getLatestMessages', () => {
    it('should return all messages if limit is not provided', () => {
      const roomName = 'testRoom';
      const message1: Message = {
        author: 'user1',
        text: 'hello1',
        timestamp: new Date(),
      };
      const message2: Message = {
        author: 'user2',
        text: 'hello2',
        timestamp: new Date(),
      };
      const messages: Message[] = [message1, message2];
      const room: Room = { name: roomName, users: new Set(), messages };
      service.createRoom(roomName);
      service.sendMessage(roomName, message1);
      service.sendMessage(roomName, message2);
      expect(service.getLatestMessages(roomName)).toEqual(messages);
    });

    it('should return the latest n messages if limit is provided', () => {
      const roomName = 'testRoom';
      const message1: Message = {
        author: 'user1',
        text: 'hello1',
        timestamp: new Date(),
      };
      const message2: Message = {
        author: 'user2',
        text: 'hello2',
        timestamp: new Date(),
      };
      const message3: Message = {
        author: 'user3',
        text: 'hello3',
        timestamp: new Date(),
      };
      const messages: Message[] = [message1, message2, message3];
      const room: Room = { name: roomName, users: new Set(), messages };
      service.createRoom(roomName);
      service.sendMessage(roomName, message1);
      service.sendMessage(roomName, message2);
      service.sendMessage(roomName, message3);
      expect(service.getLatestMessages(roomName, 2)).toEqual([
        message2,
        message3,
      ]);
    });

    it('should throw an error if the room does not exist', () => {
      const roomName = 'nonexistentRoom';
      expect(() => service.getLatestMessages(roomName)).toThrowError(
        'Room not found',
      );
    });
  });
});
