import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientDetailsService } from '../../services/patient-details.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

patients: Array<any> = [];
isLoading:boolean = true
patientID:Number = 0; 

SearchForm:FormGroup = this.fb.group({
  searchTerm:[''],
})


  constructor(private fb:FormBuilder,private patientService:PatientDetailsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPatients();
    
  }
  
getPatients(){
  this.patientService.getAllPaitents().subscribe({
    next:(data=>{
      console.log(data);
      this.patients = data
      this.isLoading=false
      
    }),
    error:(err=> console.log(err))
  })
}
searchPatient(){
  this.patientService.searchPatient(this.SearchForm.value.searchTerm).subscribe({
    next:(term=>{
      console.log(term);
      this.patients=term
    
    }),
    error:(err=>console.log(err))
  })
}


// public openAddPatient(){
//   // this.SwitchToAddPatient()
//   this.ToggleAddPatient()
// }
public openAddPatient(){
  this.SwitchToAddPatient()
  this.ToggleAddPatient()
}



public SwitchToAddPatient(){
      const popUpLayer = document.querySelector('.popUpLayer')
      popUpLayer?.classList.toggle('visible')

      const popUp = document.querySelector('.popUp')
      popUp?.classList.toggle('popUpClose')

 }


 public ToggleAddPatient(){
  const popUpLayerAddPatient = document.querySelector('.popUpLayerAddPatient')
  popUpLayerAddPatient?.classList.toggle('visible')

  const popUpAddPateint = document.querySelector('.popUpAddPateint')
  popUpAddPateint?.classList.toggle('popUpCloseAddPatient')

}

}
