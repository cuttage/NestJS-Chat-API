import { User } from './user.dto';
import { Message } from './message.dto';

export interface Room {
  name: string;
  users: Set<User> | User[];
  messages: Message[];
}
