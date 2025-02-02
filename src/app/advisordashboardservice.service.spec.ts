import { TestBed } from '@angular/core/testing';

import { AdvisordashboardserviceService } from './advisordashboardservice.service';

describe('AdvisordashboardserviceService', () => {
  let service: AdvisordashboardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisordashboardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
