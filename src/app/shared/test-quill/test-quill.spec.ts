import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuill } from './test-quill';

describe('TestQuill', () => {
  let component: TestQuill;
  let fixture: ComponentFixture<TestQuill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestQuill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestQuill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
