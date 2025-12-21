import { TestBed } from '@angular/core/testing';

import { NewApiCollection } from './new-api-collection';

describe('NewApiCollection', () => {
  let service: NewApiCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewApiCollection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
