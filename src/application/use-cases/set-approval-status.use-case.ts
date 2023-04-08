import { Injectable, Inject } from '@nestjs/common';
import { ApprovalRepository } from '../interfaces/approval-repository.interface';
import { Approval } from '../../domain/approval/approval.entity';

@Injectable()
export class SetApprovalStatusUseCase {
  constructor(
    @Inject('ApprovalRepository')
    private readonly approvalRepository: ApprovalRepository,
  ) {}

  async execute(approvalId: number, status: boolean): Promise<Approval> {
    return this.approvalRepository.setApprovalStatus(approvalId, status);
  }
}
