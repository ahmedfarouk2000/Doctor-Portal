import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientPopUpComponent } from './add-patient-pop-up.component';

describe('AddPatientPopUpComponent', () => {
  let component: AddPatientPopUpComponent;
  let fixture: ComponentFixture<AddPatientPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
