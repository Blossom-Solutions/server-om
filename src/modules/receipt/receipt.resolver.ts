import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Receipt } from './receipt.type';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { ReceiptRepository } from '../../application/interfaces/receipt-repository.interface';
import { Inject } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';

@Resolver(of => Receipt)
export class ReceiptResolver {
  constructor(
    private readonly createReceiptUseCase: CreateReceiptUseCase,
    @Inject('ReceiptRepository')
    private readonly receiptRepository: ReceiptRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(returns => Receipt)
  async createReceipt(
    @Args('date') date: Date,
    @Args('taxAmount') taxAmount: number,
    @Args('taxPercentage') taxPercentage: number,
    @Args('companyId') companyId: number,
  ): Promise<Receipt> {
    const data = { date, taxAmount, taxPercentage, companyId };
    return this.createReceiptUseCase.execute(data);
  }

  @UseGuards(AuthGuard)
  @Query(returns => Receipt)
  async getReceiptById(@Args('id') id: number): Promise<Receipt> {
    return this.receiptRepository.findById(id);
  }

  @UseGuards(AuthGuard)
  @Query(returns => [Receipt])
  async getReceiptsByCompanyId(
    @Args('companyId') companyId: number,
  ): Promise<Receipt[]> {
    return this.receiptRepository.findByCompanyId(companyId);
  }
}
