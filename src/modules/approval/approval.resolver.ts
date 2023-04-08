import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
  } from '@nestjs/graphql';
  import { Approval } from './approval.type';
  import { SetApprovalStatusUseCase } from '../../application/use-cases/set-approval-status.use-case';
  import { ListAllApprovalsUseCase } from '../../application/use-cases/list-all-approvals.use-case';
  import { FindApprovalByIdUseCase } from '../../application/use-cases/find-approval-by-id.use-case';
  import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
  import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';
  import { UseGuards } from '@nestjs/common';
  import { AuthGuard } from '../user/auth.guard';
  
  
  @Resolver(of => Approval)
  export class ApprovalResolver {
    constructor(
      private readonly setApprovalStatusUseCase: SetApprovalStatusUseCase,
      private readonly listAllApprovalsUseCase: ListAllApprovalsUseCase,
      private readonly findApprovalByIdUseCase: FindApprovalByIdUseCase,
      private readonly findApprovalsByCompanyIdUseCase: FindApprovalsByCompanyIdUseCase,
      private readonly createApprovalUseCase: CreateApprovalUseCase,
    ) {}
      
    @UseGuards(AuthGuard)
    @Mutation(returns => Approval)
    async setApprovalStatus(
      @Args('approvalId', { type: () => Int }) approvalId: number,
      @Args('status', { type: () => Boolean }) status: boolean,
    ): Promise<Approval> {
      return this.setApprovalStatusUseCase.execute(approvalId, status);
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => Approval)
    async createApproval(
      @Args('approved', { type: () => Boolean }) approved: boolean,
      @Args('companyId', { type: () => Int }) companyId: number,
    ): Promise<Approval> {
      return this.createApprovalUseCase.execute({ approved, companyId });
    }

    @UseGuards(AuthGuard)
    @Query(returns => [Approval])
    async listAllApprovals(): Promise<Approval[]> {
      return this.listAllApprovalsUseCase.execute();
    }
    
    @UseGuards(AuthGuard)
    @Query(returns => Approval, { nullable: true })
    async findApprovalById(
      @Args('approvalId', { type: () => Int }) approvalId: number,
    ): Promise<Approval | null> {
      return this.findApprovalByIdUseCase.execute(approvalId);
    }
    
    @UseGuards(AuthGuard)
    @Query(returns => [Approval])
    async findApprovalsByCompanyId(
      @Args('companyId', { type: () => Int }) companyId: number,
    ): Promise<Approval[]> {
      return this.findApprovalsByCompanyIdUseCase.execute(companyId);
    }
  }
  