import { Injectable, Inject } from '@nestjs/common';
import { CompanyRepository } from '../interfaces/company-repository.interface';
import { Company } from '../../domain/company/company.entity';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(data: Partial<Company>): Promise<Company> {
    return this.companyRepository.create(data);
  }
}
