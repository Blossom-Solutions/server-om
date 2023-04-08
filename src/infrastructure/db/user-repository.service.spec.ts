import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryService } from './user-repository.service';
import { PrismaService } from './prisma.service';
import { User } from '../../domain/user/user.entity';
import { UserRole } from '../../domain/user/user-role.enum';

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserRepositoryService>(UserRepositoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a User entity', async () => {
      const data: Partial<User> = {
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.USER,
      };
      const userEntity = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.USER,
      };
      (prismaService.user.create as jest.Mock).mockResolvedValue(userEntity);

      const result = await service.create(data);

      expect(prismaService.user.create).toHaveBeenCalledWith({ data: { email: data.email, password: data.password, role: data.role } });
      expect(result).toEqual(userEntity);
    });
  });

  describe('findByEmail', () => {
    it('should find and return a User entity by email', async () => {
      const email = 'test@example.com';
      const userEntity = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        role: UserRole.USER,
      };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userEntity);

      const result = await service.findByEmail(email);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(userEntity);
    });

    it('should return null if no User is found by email', async () => {
      const email = 'notfound@example.com';
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeNull();
    });
  });
});