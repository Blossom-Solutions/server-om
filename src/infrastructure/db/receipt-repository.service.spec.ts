import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptRepositoryService } from './receipt-repository.service';
import { PrismaService } from './prisma.service';
import { Receipt } from '../../domain/receipt/receipt.entity';

describe('ReceiptRepositoryService', () => {
  let service: ReceiptRepositoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptRepositoryService,
        {
          provide: PrismaService,
          useValue: {
            receipt: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ReceiptRepositoryService>(ReceiptRepositoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a Receipt entity', async () => {
      const data: Partial<Receipt> = {
        date: new Date(),
        taxAmount: 100,
        taxPercentage: 10,
        companyId: 1,
      };
      const receiptEntity = {
        id: 1,
        ...data,
      };
      (prismaService.receipt.create as jest.Mock).mockResolvedValue(receiptEntity);

      const result = await service.create(data);

      expect(prismaService.receipt.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(receiptEntity);
    });
  });

  describe('findById', () => {
    it('should find and return a Receipt entity by id', async () => {
      const id = 1;
      const receiptEntity = {
        id: 1,
        date: new Date(),
        taxAmount: 100,
        taxPercentage: 10,
        companyId: 1,
      };
      (prismaService.receipt.findUnique as jest.Mock).mockResolvedValue(receiptEntity);

      const result = await service.findById(id);

      expect(prismaService.receipt.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(receiptEntity);
    });

    it('should return null if no Receipt is found by id', async () => {
      const id = 2;
      (prismaService.receipt.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findById(id);

      expect(prismaService.receipt.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBeNull();
    });
  });
});