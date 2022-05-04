import { TestBed } from '@angular/core/testing';

import { TechnicalSupportService } from './technical-support.service';

describe('TechnicalSupportService', () => {
  let service: TechnicalSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
