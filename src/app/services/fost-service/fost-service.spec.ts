import { TestBed } from '@angular/core/testing';

import { FostService } from './fost-service';

describe('FostService', () => {
  let service: FostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
