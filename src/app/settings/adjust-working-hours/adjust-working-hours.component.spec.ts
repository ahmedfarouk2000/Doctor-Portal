import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustWorkingHoursComponent } from './adjust-working-hours.component';

describe('AdjustWorkingHoursComponent', () => {
  let component: AdjustWorkingHoursComponent;
  let fixture: ComponentFixture<AdjustWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustWorkingHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
