import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service'; 

@Component({
  selector: 'app-adjust-working-hours',
  templateUrl: './adjust-working-hours.component.html',
  styleUrls: ['./adjust-working-hours.component.css']
})
export class AdjustWorkingHoursComponent implements OnInit {

  adjustForm:FormGroup = this.fb.group({
    Day:['',Validators.required],
    StartTime:['',Validators.required],
    EndTime:['',Validators.required]
  })

res:any;

  constructor(private fb:FormBuilder, private adjustService: SettingsService) { }

  ngOnInit(): void {
    this.getWorkingHours();
  }

  setWorkingHours(){
    if (this.adjustForm.valid) {
      this.adjustService.setWorkingHours(this.adjustForm.value).subscribe({
        next:(data=>{
          console.log(data)
          if(data.actionCompleted){
            window.location.reload()
          }
          else{
            this.res = data    
          }
          
         
        }),
        error:(err=>console.log(err))
      })
    }
  }
  getWorkingHours(){
    this.adjustService.getWorkingHours().subscribe({
      next:(data=>{
        console.log(data);
       
      }),
      error:(err=>console.log(err))
    })
  }
}
