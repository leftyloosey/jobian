import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryRow } from './ministry-row';

describe('MinistryRow', () => {
  let component: MinistryRow;
  let fixture: ComponentFixture<MinistryRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinistryRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistryRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
