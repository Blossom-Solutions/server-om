import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { User } from '../../domain/user/user.entity';
import { BcryptConfig } from '../../config/bcrypt.config';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
  
    if (!user) {
      return null;
    }
  
    if (await BcryptConfig.compare(password, user.password)) {
      return user;
    }
  
    return null;
  }
}