import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/domain/user/user-role.enum';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let loginUseCase: LoginUseCase;
  let registerUseCase: RegisterUseCase;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a JWT token when logging in with valid credentials', async () => {
    const sampleUser = {
      id: 1,
      email: 'test@example.com',
      password: 'testpassword',
      role: 'USER',
    };

    (loginUseCase.execute as jest.Mock).mockResolvedValue(sampleUser);
    (jwtService.sign as jest.Mock).mockReturnValue('sample.jwt.token');

    const result = await resolver.login(sampleUser.email, sampleUser.password);

    expect(loginUseCase.execute).toHaveBeenCalledWith(sampleUser.email, sampleUser.password);
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: sampleUser.id,
      email: sampleUser.email,
      role: sampleUser.role,
    });
    expect(result).toEqual('sample.jwt.token');
  });

  it('should return null when logging in with invalid credentials', async () => {
    (loginUseCase.execute as jest.Mock).mockResolvedValue(null);

    const result = await resolver.login('invalid@example.com', 'wrongpassword');

    expect(loginUseCase.execute).toHaveBeenCalledWith('invalid@example.com', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('should return a JWT token when registering a new user', async () => {
    const sampleUser = {
      id: 1,
      email: 'newuser@example.com',
      password: 'newpassword',
      role: 'USER' as UserRole,
    };

    (registerUseCase.execute as jest.Mock).mockResolvedValue(sampleUser);
    (jwtService.sign as jest.Mock).mockReturnValue('sample.jwt.token');

    const result = await resolver.register(sampleUser.email, sampleUser.password, sampleUser.role);

    expect(registerUseCase.execute).toHaveBeenCalledWith(sampleUser.email, sampleUser.password, sampleUser.role);
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: sampleUser.id,
      email: sampleUser.email,
      role: sampleUser.role,
    });
    expect(result).toEqual('sample.jwt.token');
  });
});
