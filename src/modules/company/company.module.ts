import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case';
import { FindCompanyByIdUseCase } from '../../application/use-cases/find-company-by-id.use-case';
import { ListAllCompaniesUseCase } from '../../application/use-cases/list-all-companies.use-case';
import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
import { FindReceiptsByCompanyIdUseCase } from '../../application/use-cases/find-receipts-by-company-id.use-case';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';

import { ApprovalRepositoryService } from '../../infrastructure/db/approval-repository.service';
import { CompanyRepositoryService } from '../../infrastructure/db/company-repository.service';
import { ReceiptRepositoryService } from '../../infrastructure/db/receipt-repository.service';
import { PrismaModule } from '../../infrastructure/db/prisma.module';


@Module({
  
  imports: [PrismaModule],
  providers: [
    CompanyResolver,
    CreateCompanyUseCase,
    FindCompanyByIdUseCase,
    ListAllCompaniesUseCase,
    FindApprovalsByCompanyIdUseCase,
    FindReceiptsByCompanyIdUseCase,
    CreateReceiptUseCase,
    CreateApprovalUseCase,
    {
      provide: 'ReceiptRepository',
      useClass: ReceiptRepositoryService,
    },
    {
      provide: 'CompanyRepository',
      useClass: CompanyRepositoryService,
    },
    {
      provide: 'ApprovalRepository',
      useClass: ApprovalRepositoryService,
    },
  ],
})
export class CompanyModule {}
