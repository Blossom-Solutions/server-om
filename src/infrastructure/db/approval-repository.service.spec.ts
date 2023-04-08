import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalRepositoryService } from './approval-repository.service';
import { PrismaService } from './prisma.service';
import { Approval } from '../../domain/approval/approval.entity';

describe('ApprovalRepositoryService', () => {
  let service: ApprovalRepositoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovalRepositoryService,
        {
          provide: PrismaService,
          useValue: {
            approval: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ApprovalRepositoryService>(ApprovalRepositoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return an Approval entity', async () => {
      const data: Partial<Approval> = {
        approved: true,
        companyId: 1,
      };
      const approvalEntity = {
        id: 1,
        approved: true,
        companyId: 1,
      };
      (prismaService.approval.create as jest.Mock).mockResolvedValue(approvalEntity);

      const result = await service.create(data);

      expect(prismaService.approval.create).toHaveBeenCalledWith({ data: { approved: true, companyId: 1 } });
      expect(result).toEqual(approvalEntity);
    });
  });

  describe('setApprovalStatus', () => {
    it('should update and return an Approval entity', async () => {
      const approvalId = 1;
      const status = false;
      const approvalEntity = {
        id: 1,
        approved: false,
        companyId: 1,
      };
      (prismaService.approval.update as jest.Mock).mockResolvedValue(approvalEntity);

      const result = await service.setApprovalStatus(approvalId, status);

      expect(prismaService.approval.update).toHaveBeenCalledWith({ where: { id: approvalId }, data: { approved: status } });
      expect(result).toEqual(approvalEntity);
    });
  });

  describe('findById', () => {
    it('should return an Approval entity if it exists', async () => {
      const approvalId = 1;
      const approvalEntity = {
        id: 1,
        approved: true,
        companyId: 1,
      };
      (prismaService.approval.findUnique as jest.Mock).mockResolvedValue(approvalEntity);
  
      const result = await service.findById(approvalId);
  
      expect(prismaService.approval.findUnique).toHaveBeenCalledWith({ where: { id: approvalId } });
      expect(result).toEqual(approvalEntity);
    });
  
    it('should return null if the Approval entity does not exist', async () => {
      const approvalId = 2;
      (prismaService.approval.findUnique as jest.Mock).mockResolvedValue(null);
  
      const result = await service.findById(approvalId);
  
      expect(prismaService.approval.findUnique).toHaveBeenCalledWith({ where: { id: approvalId } });
      expect(result).toBeNull();
    });
  });
});
