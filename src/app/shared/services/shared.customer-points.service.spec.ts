import { TestBed } from '@angular/core/testing';

import { SharedCustomerPointsService } from './shared.customer-points.service';

describe('Shared.CustomerPointsService', () => {
  let service: SharedCustomerPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCustomerPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
