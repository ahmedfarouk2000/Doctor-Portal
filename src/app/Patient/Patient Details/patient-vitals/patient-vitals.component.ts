import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-patient-vitals',
  templateUrl: './patient-vitals.component.html',
  styleUrls: ['./patient-vitals.component.css']
})
export class PatientVitalsComponent implements OnInit {

  appointmentID: any
  vitals: any
  isLoading: boolean = true
  constructor(private vitalService: AppointmentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentID = this.route.snapshot.params?.['AppointmentId']
    this.getVitals(this.appointmentID)
  }

  getVitals(appointmentId: any) {
    this.vitalService.getVitals(appointmentId).subscribe({
      next: (data => {
        console.log(data);
        this.vitals = data
        this.isLoading = false
      })
    })
  }
}
