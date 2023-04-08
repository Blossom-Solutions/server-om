import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case';
import { FindCompanyByIdUseCase } from '../../application/use-cases/find-company-by-id.use-case';
import { ListAllCompaniesUseCase } from '../../application/use-cases/list-all-companies.use-case';
import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
import { FindReceiptsByCompanyIdUseCase } from '../../application/use-cases/find-receipts-by-company-id.use-case';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';

// Mock data
const mockCompany = {
  id: 1,
  name: 'Example Company',
  fiscalId: '123456789',
  clientNumber: 1,
};

const mockReceipt = {
  id: 1,
  date: new Date(),
  taxAmount: 100,
  taxPercentage: 10,
  companyId: 1,
};

const mockApproval = {
  id: 1,
  approved: false,
  companyId: 1,
};

// Mock use cases
const createCompanyUseCase = {
  execute: jest.fn().mockResolvedValue(mockCompany),
};

const findCompanyByIdUseCase = {
  execute: jest.fn().mockResolvedValue(mockCompany),
};

const listAllCompaniesUseCase = {
  execute: jest.fn().mockResolvedValue([mockCompany]),
};

const findApprovalsByCompanyIdUseCase = {
  execute: jest.fn().mockResolvedValue([mockApproval]),
};

const findReceiptsByCompanyIdUseCase = {
  execute: jest.fn().mockResolvedValue([mockReceipt]),
};

const createReceiptUseCase = {
  execute: jest.fn().mockResolvedValue(mockReceipt),
};

const createApprovalUseCase = {
  execute: jest.fn().mockResolvedValue(mockApproval),
};

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        {
          provide: CreateCompanyUseCase,
          useValue: createCompanyUseCase,
        },
        {
          provide: FindCompanyByIdUseCase,
          useValue: findCompanyByIdUseCase,
        },
        {
          provide: ListAllCompaniesUseCase,
          useValue: listAllCompaniesUseCase,
        },
        {
          provide: FindApprovalsByCompanyIdUseCase,
          useValue: findApprovalsByCompanyIdUseCase,
        },
        {
          provide: FindReceiptsByCompanyIdUseCase,
          useValue: findReceiptsByCompanyIdUseCase,
        },
        {
          provide: CreateReceiptUseCase,
          useValue: createReceiptUseCase,
        },
        {
          provide: CreateApprovalUseCase,
          useValue: createApprovalUseCase,
        },
      ],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create company', async () => {
    const result = await resolver.createCompany(
      mockCompany.name,
      mockCompany.fiscalId,
      mockCompany.clientNumber,
    );
    expect(createCompanyUseCase.execute).toHaveBeenCalledWith({
      name: mockCompany.name,
      fiscalId: mockCompany.fiscalId,
      clientNumber: mockCompany.clientNumber,
    });
    expect(result).toEqual(mockCompany);
  });

  it('should find company by ID', async () => {
    const result = await resolver.company(mockCompany.id);
    expect(findCompanyByIdUseCase.execute).toHaveBeenCalledWith(mockCompany.id);
    expect(result).toEqual(mockCompany);
  });

  it('should list all companies', async () => {
    const result = await resolver.companies();
    expect(listAllCompaniesUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual([mockCompany]);
  });

  it('should find approvals by company ID', async () => {
    const company = { id: mockCompany.id, name: mockCompany.name, fiscalId: mockCompany.fiscalId, clientNumber: mockCompany.clientNumber };
    const result = await resolver.approvals(company);
    expect(findApprovalsByCompanyIdUseCase.execute).toHaveBeenCalledWith(mockCompany.id);
    expect(result).toEqual([mockApproval]);
  });

  it('should find receipts by company ID', async () => {
    const company = { id: mockCompany.id, name: mockCompany.name, fiscalId: mockCompany.fiscalId, clientNumber: mockCompany.clientNumber };
    const result = await resolver.receipts(company);
    expect(findReceiptsByCompanyIdUseCase.execute).toHaveBeenCalledWith(mockCompany.id);
    expect(result).toEqual([mockReceipt]);
  });
});