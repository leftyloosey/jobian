import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { mainResolverResolver } from './main-resolver-resolver';

describe('mainResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => mainResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
