import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { PatientlistComponent } from './Patient/patientlist/patientlist.component';
import { PatientdetailsComponent } from './Patient/Patient Details/patientdetails/patientdetails.component';
import { PatientEmrComponent } from './Patient/Patient Details/patient-emr/patient-emr.component';
import { PatientVitalsComponent } from './Patient/Patient Details/patient-vitals/patient-vitals.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: CalendarComponent,
    canActivate:[AuthGuard]
  }, {
    path: 'patientlist',
    component: PatientlistComponent,
    canActivate:[AuthGuard]
  }
  , {
    path: 'patientdetails/:id',
    component: PatientdetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'emr/:AppointmentId',
    component: PatientEmrComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'vitals/:AppointmentId',
    component: PatientVitalsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {  // any other path
    path: '**',
    component: PageNotFoundComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})

export class AppRoutingModule { }
