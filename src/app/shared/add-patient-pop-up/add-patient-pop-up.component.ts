import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { PatientDetailsService } from 'src/app/services/patient-details.service';
// import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-add-patient-pop-up',
  templateUrl: './add-patient-pop-up.component.html',
  styleUrls: ['./add-patient-pop-up.component.css']
})
export class AddPatientPopUpComponent implements OnInit {
public currentDate=new Date()
  constructor(
    private fb: FormBuilder,
    private patientsService:PatientDetailsService


  ) { }

  public ErrorMsg: any = { // used to disable the error msg [disable]
    PatientName: '',
    PhoneNumber: '',
    Height: '',
    Gender: '',
    Birthdate:''
  }

  CreatePatientForm: FormGroup = this.fb.group({
    PatientName: ['', [Validators.required]],
    PhoneNumber: ['', [Validators.required,Validators.minLength(11),Validators.pattern('[0-9]+')]], // min of 8 chars do i need to display error if less than that??
    // Birthdate: ['', Validators.minLength], // min of 8 chars do i need to display error if less than that??
    Height: ['',  [Validators.required,Validators.minLength(3),Validators.pattern('[0-9]+')]], // min of 8 chars do i need to display error if less than that??
    Gender: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
    Birthdate: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
  });


  ngOnInit(): void {
    // this.ToggleDropDown()
  }

  public CurrentCreatedPatient={ // will fill this 
    PatientName:"",
    PhoneNumber:"",
    Birthdate:"",
    Height:0,
    Gender:""
}




  public Genders=['Male','Female']
    
  

 

  public TogglePopUp(){
      const popUpLayerAddPatient = document.querySelector('.popUpLayerAddPatient')
      popUpLayerAddPatient?.classList.toggle('visible')

      const popUpAddPateint = document.querySelector('.popUpAddPateint')
      popUpAddPateint?.classList.toggle('popUpCloseAddPatient')
  }

  public TogglePopUpClose(){
    this.resetAll()
    const popUpLayerAddPatient = document.querySelector('.popUpLayerAddPatient')
    popUpLayerAddPatient?.classList.toggle('visible')

    const popUpAddPateint = document.querySelector('.popUpAddPateint')
    popUpAddPateint?.classList.toggle('popUpCloseAddPatient')
}



public GoNextPage(){
  console.log('in nextttt')
  const confirmPageAddPatient=document.querySelector('#confirmPageAddPatient')
  confirmPageAddPatient?.classList.toggle('displayNoneAddPatient')
  const searchPageAddPatint=document.querySelector('#searchPageAddPatint')
  searchPageAddPatint?.classList.toggle('displayNoneAddPatient')    
}

public ToggleDropDown=()=>{
  this.RemoveLocalError('Gender')
  const dropDownAddPatient:any=  document.querySelector('#dropDownAddPatient')
  dropDownAddPatient.classList.toggle('vertical-menu-closed')
}

public FirstTimeToggle=()=>{
  const dropDownAddPatient:any=  document.querySelector('#dropDownAddPatient')
  dropDownAddPatient.classList.toggle('vertical-menu-closed')
}




public HandleCreate = (buttonId:any) => {
  // console.log('the id',buttonId)
if (buttonId=='submit'){
  for (const prop in this.ErrorMsg) {
    if (this.CreatePatientForm.controls[prop].hasError('required')) {
      this.ErrorMsg[prop] = `${prop} is required`
      this.AddLocalError(prop)
    }

    if (this.CreatePatientForm.controls[prop].hasError('minlength')) {
      this.ErrorMsg[prop] = `enter valid ${prop}`
      this.AddLocalError(prop)
    }

    if (this.CreatePatientForm.controls[prop].hasError('pattern')) {
      this.ErrorMsg[prop] = `numbers only allowed`
      this.AddLocalError(prop)
    }

    // if (this.CreatePatientForm.controls[prop].hasError('pattern')) {
    //   this.ErrorMsg[prop] = `numbers only allowed`
    //   this.AddLocalError(prop)
    // }
    // if (this.CreatePatientForm.controls[prop].hasError('email')) {
    //   this.ErrorMsg[prop] = `invalid ${prop}`
    //   this.AddLocalError(prop)
    // }

  }
  console.log(this.CreatePatientForm)

  if (this.CreatePatientForm.status == 'VALID') { // must now check in my database for the user

   
    let PatientName = this.CreatePatientForm.controls['PatientName'].value
    let PhoneNumber = this.CreatePatientForm.controls['PhoneNumber'].value
    let Height = this.CreatePatientForm.controls['Height'].value
    let Gender = this.CreatePatientForm.controls['Gender'].value
    let Birthdate = this.CreatePatientForm.controls['Birthdate'].value

    let date = new Date(Birthdate)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let finalBirthdate = [day, month, year].join('/')
    
    console.log(PatientName, PhoneNumber,Height,Gender,finalBirthdate)

    this.CurrentCreatedPatient.PatientName=PatientName
    this.CurrentCreatedPatient.Height=parseInt(Height)
    this.CurrentCreatedPatient.Gender=Gender
    this.CurrentCreatedPatient.PhoneNumber=PhoneNumber
    this.CurrentCreatedPatient.Birthdate=finalBirthdate
    console.log('current created object ',this.CurrentCreatedPatient)
    this.addNewPatient(this.CurrentCreatedPatient)
  }

}




}


public AddLocalError = (prop: any) => {
  let AddErrorMsg: any = document.querySelector(`#${prop}Span`)
  AddErrorMsg.classList.add('errorAdded')
}

public inputFunc = (event: any) => {
  let CurrentInput = event.id
  this.RemoveLocalError(CurrentInput)
  this.RemovePublicError()
}

public RemoveLocalError = (prop: any) => {
  let AddErrorMsg: any = document.querySelector(`#${prop}Span`)
  AddErrorMsg.classList.remove('errorAdded')
}


public AddPublicError = () => {
  let AddErrorMsg: any = document.querySelector(`#InvalidSpan`)
  AddErrorMsg.classList.add('invalidAdded')
}
public RemovePublicError = () => {
  let AddErrorMsg: any = document.querySelector(`#InvalidSpan`)
  AddErrorMsg.classList.remove('invalidAdded')
}

public putValueInInput(gender:string):void{
  const input:any=  document.querySelector('.gender')
  input.value=gender
  this.ToggleDropDown()
}


public setSelected=(gender:string)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
  this.putValueInInput(gender)  
  this.CreatePatientForm.controls['Gender'].setValue(gender)            
}


public onDate(event:any): void {
  this.RemoveLocalError('Birthdate')
  this.CreatePatientForm.controls['Birthdate'].setValue(event.value)            
 
  console.log('the event',event.value)
  // this.getData(this.roomsFilter.date);
}

public currentResponse={
  actionCompleted: false,
  message: "",
  token: ""
}



public addNewPatient = (NewPatient:any) => {
  this.patientsService.addNewPatient(NewPatient).subscribe({
  next:(data:any)=>{
    console.log('the search result',data)
    this.currentResponse ={...data}
  },
  complete:()=>{
    if(this.currentResponse.actionCompleted){ // just store the token in the localStorage
      console.log('successfully created the pateint')
      this.ShowConfirmOrNot=true
      this.resetAll()
      setTimeout(() => {
        this.TogglePopUp() // just close it
        
      }, 2000);
      setTimeout(() => {
        this.ShowConfirmOrNot=false
      }, 4000);
     
    }
    else {
      this.AddPublicError()
    }
  }

 })


}

public resetAll(){
  this.CreatePatientForm.controls['Birthdate'].setValue('')
  this.CreatePatientForm.controls['PatientName'].setValue('')
  this.CreatePatientForm.controls['Gender'].setValue('')
  this.CreatePatientForm.controls['PhoneNumber'].setValue('')
  this.CreatePatientForm.controls['Height'].setValue('')

  const input:any=document.querySelector('.gender')
  input.value=''

  const date:any=document.querySelector('.date')
  date.value=''

  this.RemoveLocalError('Birthdate')
  this.RemoveLocalError('PatientName')
  this.RemoveLocalError('Gender')
  this.RemoveLocalError('PhoneNumber')
  this.RemoveLocalError('Height')
  this.RemovePublicError()

}

public ShowConfirmOrNot=false






}
