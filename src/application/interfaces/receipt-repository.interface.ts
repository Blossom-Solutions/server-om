import { Receipt } from '../../domain/receipt/receipt.entity';

export interface ReceiptRepository {
  create(data: Partial<Receipt>): Promise<Receipt>;
  findById(id: number): Promise<Receipt | null>;
  findByCompanyId(companyId: number): Promise<Receipt[]>;
}
