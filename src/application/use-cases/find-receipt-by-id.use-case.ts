
import { Injectable, Inject } from '@nestjs/common';
import { ReceiptRepository } from '../interfaces/receipt-repository.interface';
import { Receipt } from '../../domain/receipt/receipt.entity';

@Injectable()
export class FindReceiptByIdUseCase {
  constructor(
    @Inject('ReceiptRepository')
    private readonly receiptRepository: ReceiptRepository,
  ) {}

  async execute(id: number): Promise<Receipt | null> {
    return this.receiptRepository.findById(id);
  }
}
