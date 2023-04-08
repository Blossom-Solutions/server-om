import { User } from '../../domain/user/user.entity';

export interface UserRepository {
  create(data: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  // Add other methods as needed, such as findById, update, delete, etc.
}
