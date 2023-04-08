import { Module } from '@nestjs/common';
import { ReceiptResolver } from './receipt.resolver';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { ReceiptRepositoryService } from '../../infrastructure/db/receipt-repository.service';
import { PrismaModule } from '../../infrastructure/db/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    ReceiptResolver,
    CreateReceiptUseCase,
    {
      provide: 'ReceiptRepository',
      useClass: ReceiptRepositoryService,
    },
  ],
})
export class ReceiptModule {}
