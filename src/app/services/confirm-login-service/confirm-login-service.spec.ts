import { TestBed } from '@angular/core/testing';

import { ConfirmLoginService } from './confirm-login-service';

describe('ConfirmLoginService', () => {
  let service: ConfirmLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
