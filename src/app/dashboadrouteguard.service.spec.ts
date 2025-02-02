import { TestBed } from '@angular/core/testing';

import { DashboadrouteguardService } from './dashboadrouteguard.service';

describe('DashboadrouteguardService', () => {
  let service: DashboadrouteguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboadrouteguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
