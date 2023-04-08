import { Injectable, Inject } from '@nestjs/common';
import { CompanyRepository } from '../interfaces/company-repository.interface';
import { Company } from '../../domain/company/company.entity';

@Injectable()
export class FindCompanyByIdUseCase {
  constructor(
    @Inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: number): Promise<Company | null> {
    return this.companyRepository.findById(id);
  }
}
