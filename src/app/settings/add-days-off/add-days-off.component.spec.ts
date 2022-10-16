import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaysOffComponent } from './add-days-off.component';

describe('AddDaysOffComponent', () => {
  let component: AddDaysOffComponent;
  let fixture: ComponentFixture<AddDaysOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDaysOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDaysOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
