import { Module } from '@nestjs/common';
import { ApprovalResolver } from './approval.resolver';
import { PrismaModule } from '../../infrastructure/db/prisma.module';
import { ApprovalRepositoryService } from '../../infrastructure/db/approval-repository.service';
import { SetApprovalStatusUseCase } from '../../application/use-cases/set-approval-status.use-case';
import { ListAllApprovalsUseCase } from '../../application/use-cases/list-all-approvals.use-case';
import { FindApprovalByIdUseCase } from '../../application/use-cases/find-approval-by-id.use-case';
import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';


@Module({
  imports: [PrismaModule],
  providers: [
    ApprovalResolver,
    SetApprovalStatusUseCase,
    ListAllApprovalsUseCase,
    FindApprovalByIdUseCase,
    FindApprovalsByCompanyIdUseCase,
    CreateApprovalUseCase,
    {
      provide: 'ApprovalRepository',
      useClass: ApprovalRepositoryService,
    },
  ],
})
export class ApprovalModule {}
