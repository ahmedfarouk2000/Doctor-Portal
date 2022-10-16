import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsPopUpComponent } from './patient-details-pop-up.component';

describe('PatientDetailsPopUpComponent', () => {
  let component: PatientDetailsPopUpComponent;
  let fixture: ComponentFixture<PatientDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
