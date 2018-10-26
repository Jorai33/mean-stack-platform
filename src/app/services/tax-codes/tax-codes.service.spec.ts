import { TestBed } from '@angular/core/testing';

import { TaxCodesService } from './tax-codes.service';

describe('TaxCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxCodesService = TestBed.get(TaxCodesService);
    expect(service).toBeTruthy();
  });
});
