import { Injectable } from '@nestjs/common';
import { FiscalIdValidator } from '../../application/interfaces/fiscal-id-validator.interface';

@Injectable()
export class FiscalIdValidatorService implements FiscalIdValidator {
  async validate(fiscalId: string): Promise<boolean> {
    // id validation has been abstracted
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.5);
      }, 1000);
    });
  }
}
