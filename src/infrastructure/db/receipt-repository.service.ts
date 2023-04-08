import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Receipt } from '../../domain/receipt/receipt.entity';
import { ReceiptRepository } from '../../application/interfaces/receipt-repository.interface';

import { Receipt as ReceiptEntity } from '@prisma/client';

@Injectable()
export class ReceiptRepositoryService implements ReceiptRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Partial<Receipt>): Promise<Receipt> {
    const receiptEntity = await this.prismaService.receipt.create({ data:{
        date: data.date,
        taxAmount: data.taxAmount,
        taxPercentage: data.taxPercentage,
        companyId: data.companyId,
    } });
    return this.mapToDomain(receiptEntity);
  }

  async findById(id: number): Promise<Receipt | null> {
    const receiptEntity = await this.prismaService.receipt.findUnique({ where: { id } });
    return receiptEntity ? this.mapToDomain(receiptEntity) : null;
  }

  async findByCompanyId(companyId: number): Promise<Receipt[]> {
    const receiptEntities = await this.prismaService.receipt.findMany({
      where: { companyId },
    });
    return receiptEntities.map(this.mapToDomain);
  }

  private mapToDomain(receiptEntity: ReceiptEntity): Receipt {
    return {
      id: receiptEntity.id,
      date: receiptEntity.date,
      taxAmount: receiptEntity.taxAmount,
      taxPercentage: receiptEntity.taxPercentage,
      companyId: receiptEntity.companyId,
    };
  }

}