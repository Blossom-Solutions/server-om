export interface FiscalIdValidator {
    validate(fiscalId: string): Promise<boolean>;
  }
  