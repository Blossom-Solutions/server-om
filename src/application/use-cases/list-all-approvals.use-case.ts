import { Injectable, Inject } from '@nestjs/common';
import { ApprovalRepository } from '../interfaces/approval-repository.interface';
import { Approval } from '../../domain/approval/approval.entity';

@Injectable()
export class ListAllApprovalsUseCase {
  constructor(
    @Inject('ApprovalRepository')
    private readonly approvalRepository: ApprovalRepository,
  ) {}

  async execute(): Promise<Approval[]> {
    return this.approvalRepository.listAll();
  }
}
