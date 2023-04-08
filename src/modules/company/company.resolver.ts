import { Resolver, Mutation, Args, ResolveField, Parent, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/auth.guard';
import { Company, CreateReceiptInput } from './company.type';
import { Receipt } from '../receipt/receipt.type';
import { Approval } from '../approval/approval.type';
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case';
import { FindCompanyByIdUseCase } from '../../application/use-cases/find-company-by-id.use-case';
import { ListAllCompaniesUseCase } from '../../application/use-cases/list-all-companies.use-case';
import { FindApprovalsByCompanyIdUseCase } from '../../application/use-cases/find-approvals-by-company-id.use-case';
import { FindReceiptsByCompanyIdUseCase } from '../../application/use-cases/find-receipts-by-company-id.use-case';
import { CreateReceiptUseCase } from '../../application/use-cases/create-receipt.use-case';
import { CreateApprovalUseCase } from '../../application/use-cases/create-approval.use-case';


@Resolver(of => Company)
export class CompanyResolver {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly findCompanyByIdUseCase: FindCompanyByIdUseCase,
    private readonly listAllCompaniesUseCase: ListAllCompaniesUseCase,
    private readonly findApprovalsByCompanyIdUseCase: FindApprovalsByCompanyIdUseCase,
    private readonly findReceiptsByCompanyIdUseCase: FindReceiptsByCompanyIdUseCase,
    private readonly createReceiptUseCase: CreateReceiptUseCase,
    private readonly createApprovalUseCase: CreateApprovalUseCase,
    ) {}
  
  @UseGuards(AuthGuard)
  @Mutation(returns => Company)
  async createCompany(
    @Args('name') name: string,
    @Args('fiscalId') fiscalId: string,
    @Args('clientNumber') clientNumber: number,
    @Args('receipts', { type: () => [CreateReceiptInput], nullable: true }) receipts?: CreateReceiptInput[],
  ): Promise<Company> {
    const data = { name, fiscalId, clientNumber };
    const company = await this.createCompanyUseCase.execute(data);

     // Create default approval
    await this.createApprovalUseCase.execute({
      approved: false,
      companyId: company.id,
    });

    if (receipts && receipts.length > 0) {
      for (const receiptData of receipts) {
        await this.createReceiptUseCase.execute({
          ...receiptData,
          companyId: company.id,
        });
      }
    }

  return company;
  }

  @UseGuards(AuthGuard)
  @Query(returns => Company, { nullable: true })
  async company(@Args('id') id: number): Promise<Company | null> {
    return this.findCompanyByIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @Query(returns => [Company])
  async companies(): Promise<Company[]> {
    return this.listAllCompaniesUseCase.execute();
  }

  @UseGuards(AuthGuard)
  @ResolveField(returns => [Approval], { nullable: true })
  async approvals(@Parent() company: Company): Promise<Approval[]> {
    const { id } = company;
    return this.findApprovalsByCompanyIdUseCase.execute(id);
  }

  @UseGuards(AuthGuard)
  @ResolveField(returns => [Receipt], { nullable: true })
  async receipts(@Parent() company: Company): Promise<Receipt[]> {
    const { id } = company;
    return this.findReceiptsByCompanyIdUseCase.execute(id);
  }
}
