import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { User } from '../../domain/user/user.entity';
import { UserRole } from '../../domain/user/user-role.enum';
import { BcryptConfig } from '../../config/bcrypt.config';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, password: string, role: UserRole = UserRole.USER): Promise<User> {
    const data: Partial<User> = {
      email,
      password,
      role,
    };
  
    data.password = await BcryptConfig.hash(password);
  
    const newUser = await this.userRepository.create(data);
    return newUser;
  }
}