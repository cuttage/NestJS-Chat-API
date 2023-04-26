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
    it('should throw an error if the room does not exist', () => {
      const message: Message = {
        author: 'Alice',
        text: 'Hello',
        timestamp: new Date(),
      };
      const roomName = 'Nonexistent Room';

      expect(() => service.sendMessage(roomName, message)).toThrowError(
        'Room not found',
      );
    });

    it('should throw an error if the author is not in the room', () => {
      const message: Message = {
        author: 'Alice',
        text: 'Hello',
        timestamp: new Date(),
      };
      const roomName = 'test-room';
      service.createRoom(roomName);

      expect(() => service.sendMessage(roomName, message)).toThrowError(
        'Author not found in room',
      );
    });

    it('should add a message to the room messages', () => {
      const message: Message = {
        author: 'Alice',
        text: 'Hello',
        timestamp: new Date(),
      };
      const roomName = 'test-room';
      const user: User = { name: message.author };
      service.createRoom(roomName);
      service.addUserToRoom(roomName, user);

      service.sendMessage(roomName, message);

      expect(service.getLatestMessages(roomName)).toContain(message);
    });
  });

  describe('getLatestMessages', () => {
    it('should throw an error if the room does not exist', () => {
      const roomName = 'Nonexistent Room';

      expect(() => service.getLatestMessages(roomName)).toThrowError(
        'Room not found',
      );
    });

    it('should return all messages when no limit is provided', () => {
      const message1: Message = {
        author: 'Alice',
        text: 'Hello',
        timestamp: new Date(),
      };
      const message2: Message = {
        author: 'Bob',
        text: 'Hi',
        timestamp: new Date(),
      };
      const roomName = 'test-room';
      const user1: User = { name: message1.author };
      const user2: User = { name: message2.author };
      service.createRoom(roomName);
      service.addUserToRoom(roomName, user1);
      service.addUserToRoom(roomName, user2);
      service.sendMessage(roomName, message1);
      service.sendMessage(roomName, message2);

      const result = service.getLatestMessages(roomName);

      expect(result).toEqual([message1, message2]);
    });

    it('should return the last n messages when a limit is provided', () => {
      const message1: Message = {
        author: 'Alice',
        text: 'Hello',
        timestamp: new Date(),
      };
      const message2: Message = {
        author: 'Bob',
        text: 'Hi',
        timestamp: new Date(),
      };
      const message3: Message = {
        author: 'Charlie',
        text: 'Hey',
        timestamp: new Date(),
      };
      const roomName = 'test-room';
      const user1: User = { name: message1.author };
      const user2: User = { name: message2.author };
      const user3: User = { name: message3.author };
      service.createRoom(roomName);
      service.addUserToRoom(roomName, user1);
      service.addUserToRoom(roomName, user2);
      service.addUserToRoom(roomName, user3);
      service.sendMessage(roomName, message1);
      service.sendMessage(roomName, message2);
      service.sendMessage(roomName, message3);

      const result = service.getLatestMessages(roomName, 2);

      expect(result).toEqual([message2, message3]);
    });
  });
});
