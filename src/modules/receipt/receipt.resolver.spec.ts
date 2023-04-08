import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptResolver } from './receipt.resolver';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { ReceiptRepository } from '../../application/interfaces/receipt-repository.interface';

// Mock data
const mockReceipt = {
  id: 1,
  date: new Date(),
  taxAmount: 100,
  taxPercentage: 10,
  companyId: 1,
};

// Mock use case
const createReceiptUseCase = {
  execute: jest.fn().mockResolvedValue(mockReceipt),
};

// Mock repository
const receiptRepository = {
  findById: jest.fn().mockResolvedValue(mockReceipt),
  findByCompanyId: jest.fn().mockResolvedValue([mockReceipt]),
};

describe('ReceiptResolver', () => {
  let resolver: ReceiptResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptResolver,
        {
          provide: CreateReceiptUseCase,
          useValue: createReceiptUseCase,
        },
        {
          provide: 'ReceiptRepository',
          useValue: receiptRepository,
        },
      ],
    }).compile();

    resolver = module.get<ReceiptResolver>(ReceiptResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create receipt', async () => {
    const result = await resolver.createReceipt(
      mockReceipt.date,
      mockReceipt.taxAmount,
      mockReceipt.taxPercentage,
      mockReceipt.companyId,
    );
    expect(createReceiptUseCase.execute).toHaveBeenCalledWith({
      date: mockReceipt.date,
      taxAmount: mockReceipt.taxAmount,
      taxPercentage: mockReceipt.taxPercentage,
      companyId: mockReceipt.companyId,
    });
    expect(result).toEqual(mockReceipt);
  });

  it('should get receipt by ID', async () => {
    const result = await resolver.getReceiptById(mockReceipt.id);
    expect(receiptRepository.findById).toHaveBeenCalledWith(mockReceipt.id);
    expect(result).toEqual(mockReceipt);
  });

  it('should get receipts by company ID', async () => {
    const result = await resolver.getReceiptsByCompanyId(mockReceipt.companyId);
    expect(receiptRepository.findByCompanyId).toHaveBeenCalledWith(
      mockReceipt.companyId,
    );
    expect(result).toEqual([mockReceipt]);
  });
});