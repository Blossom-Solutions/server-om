import { Injectable, Inject } from '@nestjs/common';
import { ApprovalRepository } from '../interfaces/approval-repository.interface';
import { Approval } from '../../domain/approval/approval.entity';

@Injectable()
export class FindApprovalsByCompanyIdUseCase {
  constructor(
    @Inject('ApprovalRepository')
    private readonly approvalRepository: ApprovalRepository,
  ) {}

  async execute(companyId: number): Promise<Approval[]> {
    return this.approvalRepository.findByCompanyId(companyId);
  }
}
