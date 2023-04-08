import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalResolver } from './approval.resolver';
import { SetApprovalStatusUseCase } from '../../application/use-cases/set-approval-status.use-case';
import { ListAllApprovalsUseCase } from '../../application/use-cases/list-all-approvals.use-case';
import { FindApprovalByIdUseCase } from '../../application/use-cases/find-approval-by-id.use-case';
import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';

// Mock data
const mockApproval = {
  id: 1,
  approved: false,
  companyId: 1
};

// Mock use cases
const setApprovalStatusUseCase = {
  execute: jest.fn().mockResolvedValue(mockApproval)
};

const listAllApprovalsUseCase = {
  execute: jest.fn().mockResolvedValue([mockApproval])
};

const findApprovalByIdUseCase = {
  execute: jest.fn().mockResolvedValue(mockApproval)
};

const findApprovalsByCompanyIdUseCase = {
  execute: jest.fn().mockResolvedValue([mockApproval])
};

const createApprovalUseCase = {
  execute: jest.fn().mockResolvedValue(mockApproval)
};

describe('ApprovalResolver', () => {
  let resolver: ApprovalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovalResolver,
        {
          provide: SetApprovalStatusUseCase,
          useValue: setApprovalStatusUseCase,
        },
        {
          provide: ListAllApprovalsUseCase,
          useValue: listAllApprovalsUseCase,
        },
        {
          provide: FindApprovalByIdUseCase,
          useValue: findApprovalByIdUseCase,
        },
        {
          provide: FindApprovalsByCompanyIdUseCase,
          useValue: findApprovalsByCompanyIdUseCase,
        },
        {
          provide: CreateApprovalUseCase,
          useValue: createApprovalUseCase,
        },
      ],
    }).compile();

    resolver = module.get<ApprovalResolver>(ApprovalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should set approval status', async () => {
    const result = await resolver.setApprovalStatus(1, true);
    expect(setApprovalStatusUseCase.execute).toHaveBeenCalledWith(1, true);
    expect(result).toEqual(mockApproval);
  });

  it('should create approval', async () => {
    const result = await resolver.createApproval(false, 1);
    expect(createApprovalUseCase.execute).toHaveBeenCalledWith({ approved: false, companyId: 1 });
    expect(result).toEqual(mockApproval);
  });

  it('should list all approvals', async () => {
    const result = await resolver.listAllApprovals();
    expect(listAllApprovalsUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual([mockApproval]);
  });

  it('should find approval by ID', async () => {
    const result = await resolver.findApprovalById(1);
    expect(findApprovalByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApproval);
  });

  it('should find approvals by company ID', async () => {
    const result = await resolver.findApprovalsByCompanyId(1);
    expect(findApprovalsByCompanyIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual([mockApproval]);
  });
});