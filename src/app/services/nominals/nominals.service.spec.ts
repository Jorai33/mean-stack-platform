import { TestBed } from '@angular/core/testing';

import { NominalsService } from './nominals.service';

describe('NominalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominalsService = TestBed.get(NominalsService);
    expect(service).toBeTruthy();
  });
});
