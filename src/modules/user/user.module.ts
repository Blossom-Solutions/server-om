import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserRepositoryService } from '../../infrastructure/db/user-repository.service';
import { PrismaModule } from '../../infrastructure/db/prisma.module';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register(JwtConfig),
    PassportModule,
],
  providers: [
    UserResolver,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryService,
    },
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy,
  ],
})
export class UserModule {}
