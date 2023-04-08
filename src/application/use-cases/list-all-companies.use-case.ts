import { Injectable, Inject } from '@nestjs/common';
import { CompanyRepository } from '../interfaces/company-repository.interface';
import { Company } from '../../domain/company/company.entity';

@Injectable()
export class ListAllCompaniesUseCase {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(): Promise<Company[]> {
    return this.companyRepository.listAll();
  }
}
