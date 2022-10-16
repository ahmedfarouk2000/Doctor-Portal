import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';



import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'



import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PatientlistComponent } from './Patient/patientlist/patientlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientdetailsComponent } from './Patient/Patient Details/patientdetails/patientdetails.component';
import { AdjustWorkingHoursComponent } from './settings/adjust-working-hours/adjust-working-hours.component';
import { ChangeConsultationDurationComponent } from './settings/change-consultation-duration/change-consultation-duration.component';
import { AddDaysOffComponent } from './settings/add-days-off/add-days-off.component';
import { PatientVitalsComponent } from './Patient/Patient Details/patient-vitals/patient-vitals.component';
import { PatientEmrComponent } from './Patient/Patient Details/patient-emr/patient-emr.component';
import { PatientNavComponent } from './shared/patient-nav/patient-nav.component';
import { AuthTokenInterceptor } from './services/interceptor/auth-token.interceptor';

import { PopUpErrorComponent } from './shared/pop-up-error/pop-up-error.component';
import { AddPatientPopUpComponent } from './shared/add-patient-pop-up/add-patient-pop-up.component';
import { PatientDetailsPopUpComponent } from './shared/patient-details-pop-up/patient-details-pop-up.component';
import { HomeComponent } from './shared/appoitment-popup/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    CalendarComponent,
    PatientlistComponent,
    PatientdetailsComponent,
    AddDaysOffComponent,
    PatientVitalsComponent,
    PatientEmrComponent,
    PatientNavComponent,
    AdjustWorkingHoursComponent,
    ChangeConsultationDurationComponent,
    PopUpErrorComponent,
    AddPatientPopUpComponent,
    PatientDetailsPopUpComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatTabsModule,
    DragDropModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
