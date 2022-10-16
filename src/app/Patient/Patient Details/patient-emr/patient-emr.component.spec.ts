import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmrComponent } from './patient-emr.component';

describe('PatientEmrComponent', () => {
  let component: PatientEmrComponent;
  let fixture: ComponentFixture<PatientEmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEmrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientEmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
