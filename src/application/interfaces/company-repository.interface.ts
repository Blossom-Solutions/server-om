import { Company } from '../../domain/company/company.entity';

export interface CompanyRepository {
  create(data: Partial<Company>): Promise<Company>;
  findById(id: number): Promise<Company | null>;
  listAll(): Promise<Company[]>;
}
