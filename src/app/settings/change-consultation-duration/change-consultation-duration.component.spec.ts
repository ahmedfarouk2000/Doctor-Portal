import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeConsultationDurationComponent } from './change-consultation-duration.component';

describe('ChangeConsultationDurationComponent', () => {
  let component: ChangeConsultationDurationComponent;
  let fixture: ComponentFixture<ChangeConsultationDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeConsultationDurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeConsultationDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
