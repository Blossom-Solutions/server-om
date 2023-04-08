import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepositoryService } from './company-repository.service';
import { PrismaService } from './prisma.service';
import { Company } from '../../domain/company/company.entity';

describe('CompanyRepositoryService', () => {
  let service: CompanyRepositoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyRepositoryService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompanyRepositoryService>(CompanyRepositoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a Company entity', async () => {
      const data: Partial<Company> = {
        name: 'Test Company',
        fiscalId: '12345678',
        clientNumber: 123,
      };
      const companyEntity = {
        id: 1,
        name: 'Test Company',
        fiscalId: '12345678',
        clientNumber: 123,
      };
      (prismaService.company.create as jest.Mock).mockResolvedValue(companyEntity);

      const result = await service.create(data);

      expect(prismaService.company.create).toHaveBeenCalledWith({ data: { name: data.name, fiscalId: data.fiscalId, clientNumber: data.clientNumber } });
      expect(result).toEqual(companyEntity);
    });
  });

  describe('findById', () => {
    it('should find and return a Company entity by id', async () => {
      const id = 1;
      const companyEntity = {
        id: 1,
        name: 'Test Company',
        fiscalId: '12345678',
        clientNumber: 123,
      };
      (prismaService.company.findUnique as jest.Mock) = jest.fn().mockResolvedValue(companyEntity);
  
      const result = await service.findById(id);
  
      expect(prismaService.company.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(companyEntity);
    });
  
    it('should return null if no Company is found by id', async () => {
      const id = 2;
      (prismaService.company.findUnique as jest.Mock) = jest.fn().mockResolvedValue(null);
  
      const result = await service.findById(id);
  
      expect(prismaService.company.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeNull();
    });
  });
});
