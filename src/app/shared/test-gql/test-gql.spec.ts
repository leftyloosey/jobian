import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGql } from './test-gql';

describe('TestGql', () => {
  let component: TestGql;
  let fixture: ComponentFixture<TestGql>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestGql]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestGql);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
