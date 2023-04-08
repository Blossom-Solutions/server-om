import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Company } from '../../domain/company/company.entity';

import { Company as CompanyEntity }  from '@prisma/client';
import { CompanyRepository } from '../../application/interfaces/company-repository.interface';

@Injectable()
export class CompanyRepositoryService implements CompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Partial<Company>): Promise<Company> {
    const companyEntity = await this.prismaService.company.create({ data: {name: data.name, fiscalId: data.fiscalId, clientNumber: data.clientNumber} });
    return this.mapToDomain(companyEntity)
  }

  async listAll(): Promise<Company[]> {
    const companyEntities = await this.prismaService.company.findMany();
    return companyEntities.map(this.mapToDomain);
  }
  
  async findById(id: number): Promise<Company | null> {
    const companyEntity = await this.prismaService.company.findUnique({ where: { id } });
    return companyEntity ? this.mapToDomain(companyEntity) : null;
  }

  private  mapToDomain(companyEntity: CompanyEntity): Company {
    return {
      id: companyEntity.id,
      name: companyEntity.name,
      fiscalId: companyEntity.fiscalId,
      clientNumber: companyEntity.clientNumber,
    };
  }

  // Implement other methods as needed, such as update, delete, etc.

}
