import { Injectable, Inject } from '@nestjs/common';
import { ApprovalRepository } from '../interfaces/approval-repository.interface';
import { Approval } from '../../domain/approval/approval.entity';

@Injectable()
export class FindApprovalByIdUseCase {
  constructor(
    @Inject('ApprovalRepository')
    private readonly approvalRepository: ApprovalRepository,
  ) {}

  async execute(approvalId: number): Promise<Approval | null> {
    return this.approvalRepository.findById(approvalId);
  }
}
