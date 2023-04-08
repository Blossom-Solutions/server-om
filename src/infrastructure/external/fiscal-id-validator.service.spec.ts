import { Test, TestingModule } from '@nestjs/testing';
import { FiscalIdValidatorService } from './fiscal-id-validator.service';

describe('FiscalIdValidatorService', () => {
  let service: FiscalIdValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiscalIdValidatorService],
    }).compile();

    service = module.get<FiscalIdValidatorService>(FiscalIdValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should return a boolean value', async () => {
      const fiscalId = '123456789';
      const validationResult = await service.validate(fiscalId);
      expect(typeof validationResult).toBe('boolean');
    });

    it('should resolve within 1000ms', async () => {
      const fiscalId = '123456789';
      jest.useFakeTimers();
      const promise = service.validate(fiscalId);
      jest.advanceTimersByTime(1000);
      const validationResult = await promise;
      expect(validationResult).toBeDefined();
      expect(typeof validationResult).toBe('boolean');
      jest.useRealTimers();
    });
  });
});
