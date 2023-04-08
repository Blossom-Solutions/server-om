import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Approval as ApprovalEntity }  from '@prisma/client';
import { Approval } from '../../domain/approval/approval.entity';
import { ApprovalRepository } from '../../application/interfaces/approval-repository.interface';

@Injectable()
export class ApprovalRepositoryService implements ApprovalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Partial<Approval>): Promise<Approval> {
    const approvalEntity = await this.prismaService.approval.create({ data:{approved:data.approved, companyId:data.companyId} });
    return this.mapToDomain(approvalEntity)
  }

  async setApprovalStatus(approvalId: number, status: boolean): Promise<Approval> {
    const approvalEntity = await this.prismaService.approval.update({
      where: { id: approvalId },
      data: { approved: status },
    });
    return this.mapToDomain(approvalEntity);
  }

  async findById(approvalId: number): Promise<Approval | null> {
    const approvalEntity = await this.prismaService.approval.findUnique({
      where: { id: approvalId },
    });

    return approvalEntity ? this.mapToDomain(approvalEntity) : null;
  }

  async listAll(): Promise<Approval[]> {
    const approvals = await this.prismaService.approval.findMany();
    return approvals.map(approval => this.mapToDomain(approval));
  }

  async findByCompanyId(companyId: number): Promise<Approval[]> {
    const approvals = await this.prismaService.approval.findMany({
      where: { companyId },
    });
    return approvals.map(approval => this.mapToDomain(approval));
  }

  private  mapToDomain(approvalEntity: ApprovalEntity): Approval {
    return {
      id: approvalEntity.id,
      approved: approvalEntity.approved,
      companyId: approvalEntity.companyId,
    };
  }

  // Implement other methods as needed, such as findById, update, delete, etc.
}


