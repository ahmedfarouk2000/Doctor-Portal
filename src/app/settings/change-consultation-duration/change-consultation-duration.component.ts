import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service'; 
@Component({
  selector: 'app-change-consultation-duration',
  templateUrl: './change-consultation-duration.component.html',
  styleUrls: ['./change-consultation-duration.component.css']
})
export class ChangeConsultationDurationComponent implements OnInit {

  cosultaionForm:FormGroup = this.fb.group({
    Consultation:['',[Validators.required, Validators.min(10)]]
  })

  mins:number=0
  res:any
  isLoading:boolean=true
  constructor(private fb:FormBuilder, private consultService: SettingsService,private router:Router,private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.getDuration();
    this.generateArray()
  }

  public getDuration(){  
    this.consultService.getconsultaionDuration().subscribe({
      next:(time=>{
        this.mins=time
        
      }),
      complete:()=>{
        setTimeout(() => {
          this.isLoading=false
        }, 200);
      
      }
    
    })
  }
  public setDuration(duration:any){
    this.consultService.setconsultaionDuration(duration).subscribe({
      next:(data=>{
        console.log('the data',data)
        if(data.actionCompleted){
            window.location.reload()
        }
        else{
          this.ErrorMsg=data.message
          this.AddLocalError('Duration')
        }

      }),
     
    })
  }



  DurationForm: FormGroup = this.fb.group({
    Duration: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
  });

  
  public ErrorMsg =''
  public AllDurations :number[]= []; // of numbers
  public generateArray(){
    for(let i=10 ; i<=60;i+=5){
        this.AllDurations.push(i)
    }
  }


  public HandleSetConsultationDuration = (buttonId:any) => {
      if(buttonId=='DurationButton'){
        if (this.DurationForm.controls['Duration'].hasError('required')) {
          this.ErrorMsg = `Duration is required`
          this.AddLocalError('Duration')
        }
      
        if (this.DurationForm.status == 'VALID') { // must now check in my database for the user
          // this.EditAppointmentDetails(this.currentSelectedSlot.appointmentId,FinalString)
            console.log(this.DurationForm.controls['Duration']);
            // let currentDuration={DayOfWeek:this.DurationForm.controls['Duration'].value}
            this.setDuration(this.DurationForm.controls['Duration'].value)
            
        }

      }
   
     
    
    }





public setSelectedDuration=(duration:any)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
  this.DurationForm.controls['Duration'].setValue(duration)   
  this.ToggleDropDownDuration()         
}


public ToggleDropDownDuration=()=>{
  this.RemoveLocalError('Duration')
  const dropDownDuration:any=  document.querySelector('#dropDownDuration')
  dropDownDuration.classList.toggle('vertical-menu-closed')
}



public RemoveLocalError = (prop: any) => {
  let ErrorMsgRemoved: any = document.querySelector(`#${prop}Span`)
  ErrorMsgRemoved.classList.remove('errorAdded')
}

public AddLocalError = (prop: any) => {
  let ErrorMsgAdded: any = document.querySelector(`#${prop}Span`)
  ErrorMsgAdded.classList.add('errorAdded')
}




















}
