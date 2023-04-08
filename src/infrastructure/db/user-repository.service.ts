import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../../domain/user/user.entity';
import { UserRole as DomainUserRole } from '../../domain/user/user-role.enum';
import { UserRepository } from '../../application/interfaces/user-repository.interface';

import { User as UserEntity, UserRole as PrismaUserRole } from '@prisma/client';

@Injectable()
export class UserRepositoryService implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Partial<User>): Promise<User> {
    const userEntity = await this.prismaService.user.create({ data:{
      email: data.email,
      password: data.password,
      role: data.role,
    } });
    return this.mapToDomain(userEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.prismaService.user.findUnique({ where: { email } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  private mapToDomain(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      role: this.mapRoleToDomain(userEntity.role),
    };
  }

  private mapRoleToDomain(role: PrismaUserRole): DomainUserRole {
    return DomainUserRole[role as keyof typeof DomainUserRole];
  }

  // Implement other methods as needed, such as findById, update, delete, etc.
}