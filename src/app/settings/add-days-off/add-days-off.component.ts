import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-days-off',
  templateUrl: './add-days-off.component.html',
  styleUrls: ['./add-days-off.component.css']
})
export class AddDaysOffComponent implements OnInit {

  res:any

  DaysOff: FormGroup = this.fb.group({
    Day: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
  });

  //  daysOffForm:FormGroup = this.fb.group(
  // {
  //   DayOfWeek:['',Validators.required]
  //   //DayOfWeek:new FormArray([])
  // }
  // )

  constructor(private fb:FormBuilder, 
    private dayOff:SettingsService) { }

  ngOnInit(): void {
  }

  public setDay(currentDay:any){
    this.dayOff.setDaysOff(currentDay).subscribe({
      next:(data=>{
        if(data.actionCompleted){
          console.log('in data',data)
            window.location.reload()
        }
        else{
          console.log('error',data.message)
          this.ErrorMsg=data.message
          this.AddLocalError('Day')
        }
      
      }
      ),
      error:(err=>console.log(err))
    })
  }
  public loading=false
  public ErrorMsg =''
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  public HandleDaysOff = (buttonId:any) => {
      if(buttonId=='DaysOffButton'){
        if (this.DaysOff.controls['Day'].hasError('required')) {
          this.ErrorMsg = `Day is required`
          this.AddLocalError('Day')
        }
      
        if (this.DaysOff.status == 'VALID') { // must now check in my database for the user
          // this.EditAppointmentDetails(this.currentSelectedSlot.appointmentId,FinalString)
            console.log(this.DaysOff.controls['Day']);
            let currentDay={DayOfWeek:this.DaysOff.controls['Day'].value}
            this.setDay(currentDay)
            
        }

      }
   
     
    
    }





public setSelectedDaysOff=(day:any)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
  this.DaysOff.controls['Day'].setValue(day)   
  this.ToggleDropDownDaysOff()         
}


public ToggleDropDownDaysOff=()=>{
  this.RemoveLocalError('Day')
  const dropDownDaysOff:any=  document.querySelector('#dropDownDaysOff')
  dropDownDaysOff.classList.toggle('vertical-menu-closed')
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
