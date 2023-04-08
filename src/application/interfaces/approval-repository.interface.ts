import { Approval } from '../../domain/approval/approval.entity';

export interface ApprovalRepository {
  create(data: Partial<Approval>): Promise<Approval>;
  setApprovalStatus(approvalId: number, status: boolean): Promise<Approval>;
  findById(approvalId: number): Promise<Approval | null>;
  listAll(): Promise<Approval[]>
  findByCompanyId(companyId: number): Promise<Approval[]>
  // Add other methods as needed, such as findById, delete, etc.
}