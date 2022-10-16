import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientDetailsService } from '../../../services/patient-details.service';

@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})
export class PatientdetailsComponent implements OnInit {

  patientDetails: any;
  patientID: any;
  isLoading: boolean = true;
  appoitmentID: Array<any> = [];
  ids: any
  constructor(private patientService: PatientDetailsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.params?.['id']
    // this.route.params.subscribe(params => console.log(params))
    this.showPatient(this.patientID);
  }
  showPatient(id: any) {
    this.patientService.getPaitientDetails(id).subscribe({
      next: (data => {
        console.log(data)
        this.patientDetails = data
        this.isLoading = false

        // this.patientDetails.appointments.forEach((appointment: any) => {
        //   this.ids = appointment.appointmentId
        //   this.appoitmentID.push(this.ids)
        // })
      }),
      error: (err => console.log(err))
    })
  }


  public convertToStringDate(DateInput: any) {
    var day = new Date(DateInput).getDate();
    var month = new Date(DateInput).getMonth() + 1;
    var year = new Date(DateInput).getFullYear();
    let currentStringDate: string = `${day}/${month}/${year}`
    return currentStringDate
  }

  public convertToStringTime(DateInput: any) {
    let currentSlotDateTemp = new Date(DateInput);
    let currentSlotDateTempHours = currentSlotDateTemp.getHours()
    let currentSlotDateTempMin = currentSlotDateTemp.getMinutes()
    let currentSlotTime = `${this.addZero(currentSlotDateTempHours)}:${this.addZero(currentSlotDateTempMin)}`
    return currentSlotTime
  }

  // public getAge (BirthDate:Date){
  //   let currentDate =new Date()
  //   let currentBirthDate =new Date(BirthDate)
  //   console.log(currentDate-currentBirthDate);
    
  // }

  public getAge(dateString:any) {
    // console.log('here',dateString);
    let currentTemp = dateString.split('/')
    let currentFinal= `${currentTemp[1]}/${currentTemp[0]}/${currentTemp[2]}`
    // console.log(currentFinal);
    var today = new Date();
    var birthDate = new Date(currentFinal);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    console.log(age);
    
    // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //     age--;
    // }
    return age;
}


public addZero(number: any) {
  let currentNumber = number
  if (number.toString().length == 1) {
    currentNumber = `0${number}`
  }
  return currentNumber // as string
}




}
