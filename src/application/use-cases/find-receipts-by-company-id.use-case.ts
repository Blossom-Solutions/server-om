// src/application/use-cases/find-receipts-by-company-id.use-case.ts

import { Injectable, Inject } from '@nestjs/common';
import { ReceiptRepository } from '../interfaces/receipt-repository.interface';
import { Receipt } from '../../domain/receipt/receipt.entity';

@Injectable()
export class FindReceiptsByCompanyIdUseCase {
  constructor(
    @Inject('ReceiptRepository')
    private readonly receiptRepository: ReceiptRepository,
  ) {}

  async execute(companyId: number): Promise<Receipt[]> {
    return this.receiptRepository.findByCompanyId(companyId);
  }
}
