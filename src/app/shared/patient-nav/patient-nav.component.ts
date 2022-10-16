import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientDetailsService } from 'src/app/services/patient-details.service';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.css']
})
export class PatientNavComponent implements OnInit {
  patientID: any;
  appoitmentID: Array<any> = [];
  patientDetails: any;
  ids: any
  constructor(private route: ActivatedRoute, private patientService: PatientDetailsService) { }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.params?.['id']
    this.showPatient(this.patientID)
  }
  showPatient(id: any) {
    this.patientService.getPaitientDetails(id).subscribe({
      next: (data => {
        this.patientDetails = data
        this.patientDetails.appointments.forEach((appointment: any) => {
          this.ids = appointment.appointmentId
          this.appoitmentID.push(this.ids)
        })
      }),
      error: (err => console.log(err))
    })
  }
}
