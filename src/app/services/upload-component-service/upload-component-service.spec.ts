import { TestBed } from '@angular/core/testing';

import { UploadComponentService } from './upload-component-service';

describe('UploadComponentService', () => {
  let service: UploadComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
