
import { Injectable, Inject } from '@nestjs/common';
import { ReceiptRepository } from '../interfaces/receipt-repository.interface';
import { Receipt } from '../../domain/receipt/receipt.entity';

@Injectable()
export class CreateReceiptUseCase {
  constructor(
    @Inject('ReceiptRepository')
    private readonly receiptRepository: ReceiptRepository,
  ) {}

  async execute(data: Partial<Receipt>): Promise<Receipt> {
    return this.receiptRepository.create(data);
  }
}
