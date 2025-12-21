import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { redirectorResolver } from './redirector-resolver';

describe('redirectorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => redirectorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
