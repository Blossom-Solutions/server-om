import { Injectable } from '@nestjs/common';
import { FiscalIdValidator } from '../interfaces/fiscal-id-validator.interface';

@Injectable()
export class ValidateFiscalIdUseCase {
  constructor(private readonly fiscalIdValidator: FiscalIdValidator) {}

  async execute(fiscalId: string): Promise<boolean> {
    return this.fiscalIdValidator.validate(fiscalId);
  }
}
