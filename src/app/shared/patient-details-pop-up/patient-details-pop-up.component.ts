import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { PatientDetailsService } from 'src/app/services/patient-details.service';
// import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-patient-details-pop-up',
  templateUrl: './patient-details-pop-up.component.html',
  styleUrls: ['./patient-details-pop-up.component.css']
})


export class PatientDetailsPopUpComponent implements OnInit {
  public currentDate=new Date()

  public currentEMR:any={
    appointmentId:-1,
    emrDate:'',
    emrId:-1,
    files:[]
  }
 
  ngOnInit(): void {
    // console.log('in child',this.PatientDetailsInput)
  }

  
  @Input () PatientDetailsInput:any ={} // will send the data here from calendar
  @Input () currentSelectedSlot:any ={} // will send the data here from calendar

  @Input () AppointmentDetailsInput:any =[] // will contain all the week details
  @Input () AppointmentDateInput:any ={} // start time + date 

  @Output() onClickDelete:EventEmitter<any> =new EventEmitter<any>()
  @Output() onClickEditPatientDetails:EventEmitter<any> =new EventEmitter<any>()
  @Output() onClickEditAppointmentDetails:EventEmitter<any> =new EventEmitter<any>()
  @Output() onClickEditPatientVitals:EventEmitter<any> =new EventEmitter<any>()

  public ConfirmDelete (){
    this.RemovePublicError()
    this.onClickDelete.emit() ; // the value passed from the child
  }

  

  public ConfirmEditPatientDetails (ConfrimOrNot:boolean){
    this.onClickEditPatientDetails.emit(ConfrimOrNot) ; // the value passed from the child
  }
  public ConfrimEditAppointmentDetails (ConfrimOrNot:boolean){
    this.onClickEditAppointmentDetails.emit(ConfrimOrNot) ; // the value passed from the child
  }
  public ConfirmEditPatientVitals (ConfrimOrNot:boolean){
    this.onClickEditPatientVitals.emit(ConfrimOrNot) ; // the value passed from the child
  }

  ngOnChanges():void{
        
      // for patient detials
        this.PatientDetailsForm.controls['PatientNameEdit'].setValue(this.PatientDetailsInput.patientName)       
        this.PatientDetailsForm.controls['PhoneNumberEdit'].setValue(this.PatientDetailsInput.phoneNumber)       
        this.PatientDetailsForm.controls['HeightEdit'].setValue(this.PatientDetailsInput.height)       
        this.PatientDetailsForm.controls['GenderEdit'].setValue(this.PatientDetailsInput.gender)   
        let newDateArray= this.PatientDetailsInput.birthDate.split('/')
        let newDate=`${newDateArray[1]}/${newDateArray[0]}/${newDateArray[2]}` //
        this.PatientDetailsForm.controls['BirthdateEdit'].setValue(new Date(newDate))  
    
        // for appointment detials
        this.AppointmentDetailsForm.controls['Date'].setValue(new Date(this.AppointmentDateInput.date))  
        let TimeInput = this.TimeFormat(this.AppointmentDateInput.StartTime)
        this.AppointmentDetailsForm.controls['Time'].setValue(TimeInput)  
        this.FillAvailableTimes()

        //for vitals
        this.getVitals(this.currentSelectedSlot.appointmentId)
        this.getEMR(this.currentSelectedSlot.appointmentId)

        
         
        let dateTemp1 =this.convertToStringDate(new Date())
        let dateTemp2 =this.convertToStringDate(this.currentSelectedSlot.date)
        console.log('comp',dateTemp1==dateTemp2)
        if(dateTemp1==dateTemp2){
          this.SameDayToEditVitals=true
        }
        else {
          this.SameDayToEditVitals=false
        }

        this.EMRerrorMsg='Note: You Can Only Upload Files on The Day of The Consultation!'
      
        
         
  }
  public SameDayToEditVitals=false


  public convertToStringDate(DateInput:any){
    var day = new Date(DateInput).getDate();
    var month = new Date(DateInput).getMonth()+1;
    var year = new Date(DateInput).getFullYear();
    let currentStringDate:string=`${year}-${month}-${day}`
    return currentStringDate
  }

  public TimeFormat(startTime:any){
    let joinedTime = `${startTime.hour}:${startTime.min}`
    if (startTime.min.toString().length==1 && startTime.hour.toString().length==1){  // in both
      joinedTime = `0${startTime.hour}:0${startTime.min}`
    }
    else if (startTime.min.toString().length==1 && startTime.hour.toString().length==2){ // append in min
      joinedTime = `${startTime.hour}:0${startTime.min}`
    }
    else if (startTime.min.toString().length==2 && startTime.hour.toString().length==1){ // append in min only
      joinedTime = `0${startTime.hour}:${startTime.min}`
    }
    return joinedTime
  }

  public FillAvailableTimes(){
    this.AllAvailableTimes=[] // just reset it
    for (const currentSlot of this.AppointmentDetailsInput) {
      this.AllAvailableTimes.push(this.TimeFormat(currentSlot.StartTime))
    }
  }

  public AllAvailableTimes:any=[]


  constructor(
    private fb: FormBuilder,
    private patientsService:PatientDetailsService,
    private appointmentsService:AppointmentsService
  ) { }

  public CurrentPatientDetailsFormErrorMsg: any = { // used to disable the error msg [disable]
    PatientNameEdit: '',
    PhoneNumberEdit: '',
    HeightEdit: '',
    GenderEdit: '',
    BirthdateEdit:''
  }
  public CurrentPatientDetailsForm={ // will fill this 
    PatientNameEdit:"",
    PhoneNumberEdit:"",
    BirthdateEdit:"",
    HeightEdit:0,
    GenderEdit:""
}

public CurrentAppointmentDetailsForm={ // will fill this 
  Date:"",
  Time:"",
}

public CurrentAppointmentDetailsFormErrorMsg: any = { // used to disable the error msg [disable]
  Date:"",
  Time:"",
}

public CurrentPatientVitalsFormErrorMsg: any = { // used to disable the error msg [disable]
  Temperature:"",
  UpperBloodPressure:"",
  LowerBloodPressure:"",
  Weight:"",
  Oxygen:"",
  SmokingStatus:"",
}

public CurrentPatientVitalsForm={ // will fill this 
  Temperature:"",
  UpperBloodPressure:"",
  LowerBloodPressure:"",
  Weight:"",
  Oxygen:"",
  SmokingStatus:"",
}

public Genders=['Male','Female']
public SmokingStatus=['Smoker','Non-Smoker']


 

  PatientDetailsForm: FormGroup = this.fb.group({
    PatientNameEdit: ['', [Validators.required]],
    PhoneNumberEdit: ['', [Validators.required,Validators.minLength(11),Validators.pattern('[0-9]+')]], // min of 8 chars do i need to display error if less than that??
    HeightEdit: ['',  [Validators.required,Validators.minLength(3),Validators.pattern('[0-9]+')]], // min of 8 chars do i need to display error if less than that??
    GenderEdit: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
    BirthdateEdit: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
  });


  AppointmentDetailsForm: FormGroup = this.fb.group({
    Date: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
    Time: ['',[Validators.required]],// min of 8 chars do i need to display error if less than that??
  });


  PatientVitalsForm: FormGroup = this.fb.group({ // all normal inputs except for SmokingStatus
    Temperature : ['',[Validators.required,Validators.min(35),Validators.max(45)]],
    UpperBloodPressure : ['',[Validators.required,Validators.min(120),Validators.max(180)]],
    LowerBloodPressure : ['',[Validators.required,Validators.min(80),Validators.max(120)]],
    Weight : ['',[Validators.required,Validators.min(10),Validators.max(220)]],
    Oxygen  : ['',[Validators.required,Validators.min(80),Validators.max(100)]],
    SmokingStatus  : ['',[Validators.required]],
  });

 

  public AddLocalError = (prop: any) => {
    let AddCurrentPatientDetailsFormErrorMsg: any = document.querySelector(`#${prop}Span`)
    AddCurrentPatientDetailsFormErrorMsg.classList.add('errorAdded')
  }

  public inputFunc = (event: any) => {
    let CurrentInput = event.id
    this.RemoveLocalError(CurrentInput)
    this.RemovePublicError()
  }

  public AddPublicError = () => {
    let AddErrorMsg: any = document.querySelector(`#InvalidSpanEdit`)
    AddErrorMsg.classList.add('invalidAdded')
  }

  public RemovePublicError = () => {
    let AddCurrentPatientDetailsFormErrorMsg: any = document.querySelector(`#InvalidSpanEdit`)
    AddCurrentPatientDetailsFormErrorMsg.classList.remove('invalidAdded')
  }



  public RemoveLocalError = (prop: any) => {
    let AddCurrentPatientDetailsFormErrorMsg: any = document.querySelector(`#${prop}Span`)
    AddCurrentPatientDetailsFormErrorMsg.classList.remove('errorAdded')
  }

  public onDate(event:any): void {
    this.RemoveLocalError('BirthdateEdit')
    // this.PatientDetailsForm.controls['BirthdateEdit'].setValue(event.value)  
    this.RemovePublicError()          
    console.log('the event',event.value)
  }

  public onDateAppointmentDate(event:any): void {
    this.RemoveLocalError('Date')
    this.RemovePublicError()
    // this.PatientDetailsForm.controls['BirthdateEdit'].setValue(event.value)            
    console.log('the event',event.value)
  }

  public ToggleDropDownPatientDetails=()=>{
    this.RemovePublicError()
    this.RemoveLocalError('GenderEdit')
    const dropDownEditPatient:any=  document.querySelector('#dropDownEditPatient')
    dropDownEditPatient.classList.toggle('vertical-menu-closed')
  }

  public setSelectedPatientDetails=(gender:string)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
    this.PatientDetailsForm.controls['GenderEdit'].setValue(gender)   
    this.ToggleDropDownPatientDetails()         
  }

  


  public ToggleDropDownAppointmentDetails=()=>{
    this.RemovePublicError()
    this.RemoveLocalError('Time')
    const dropDownEditAppointment:any=  document.querySelector('#dropDownEditAppointment')
    dropDownEditAppointment.classList.toggle('vertical-menu-closed')
  }

  

  public setSelectedAppointmentDetails=(time:any)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
    this.RemovePublicError()
    this.AppointmentDetailsForm.controls['Time'].setValue(time)   
    this.ToggleDropDownAppointmentDetails()         
  }

  public ToggleDropDownPatientVitals=()=>{
    this.RemoveLocalError('SmokingStatus')
    const dropDownPatientVitals:any=  document.querySelector('#dropDownPatientVitals')
    dropDownPatientVitals.classList.toggle('vertical-menu-closed')
  }

  public setSelectedPatientVitals=(SmokingStatus:any)=>{ // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
    this.PatientVitalsForm.controls['SmokingStatus'].setValue(SmokingStatus)   
    this.ToggleDropDownPatientVitals()         
  }

 
  public HandleEditPatientDetails = (buttonId:any) => {
    // console.log('the id',buttonId)
  if (buttonId=='submitEditPatient'){
    for (const prop in this.CurrentPatientDetailsFormErrorMsg) {
      if (this.PatientDetailsForm.controls[prop].hasError('required')) {
        this.CurrentPatientDetailsFormErrorMsg[prop] = `${prop} is required`
        this.AddLocalError(prop)
      }
  
      if (this.PatientDetailsForm.controls[prop].hasError('minlength')) {
        this.CurrentPatientDetailsFormErrorMsg[prop] = `enter valid ${prop}`
        this.AddLocalError(prop)
      }
  
      if (this.PatientDetailsForm.controls[prop].hasError('pattern')) {
        this.CurrentPatientDetailsFormErrorMsg[prop] = `numbers only allowed`
        this.AddLocalError(prop)
      }
  
    }
    console.log(this.PatientDetailsForm)
  
    if (this.PatientDetailsForm.status == 'VALID') { // must now check in my database for the user
  
     
      let PatientName = this.PatientDetailsForm.controls['PatientNameEdit'].value
      let PhoneNumber = this.PatientDetailsForm.controls['PhoneNumberEdit'].value
      let Height = this.PatientDetailsForm.controls['HeightEdit'].value
      let Gender = this.PatientDetailsForm.controls['GenderEdit'].value
      let Birthdate = this.PatientDetailsForm.controls['BirthdateEdit'].value

     
  
      let date = new Date(Birthdate)
      console.log('date',date)
      let year = date.getFullYear()
      let month = String(date.getMonth() + 1).padStart(2, '0')
      let day = String(date.getDate()).padStart(2, '0')
      let finalBirthdate = [day, month, year].join('/')
      
      console.log(PatientName, PhoneNumber,Height,Gender,finalBirthdate)
  
      this.CurrentPatientDetailsForm.PatientNameEdit=PatientName
      this.CurrentPatientDetailsForm.HeightEdit=parseInt(Height)
      this.CurrentPatientDetailsForm.GenderEdit=Gender
      this.CurrentPatientDetailsForm.PhoneNumberEdit=PhoneNumber
      this.CurrentPatientDetailsForm.BirthdateEdit=finalBirthdate
      console.log('current created object ',this.CurrentPatientDetailsForm)
      // this.addNewPatient(this.CurrentPatientDetailsForm)

      let {PatientNameEdit,PhoneNumberEdit,BirthdateEdit,HeightEdit,GenderEdit} =this.CurrentPatientDetailsForm
        let CurrentPatientNew={
          PatientName:PatientNameEdit,
          PhoneNumber:PhoneNumberEdit,
          Birthdate:BirthdateEdit,
          Height:HeightEdit,
          Gender:GenderEdit
        }
        // console.log(this.currentSelectedSlot.PatientId)
  
      this.EditPatientDetails(CurrentPatientNew,this.currentSelectedSlot.PatientID)
    }
  
  }
  
  
  
  
  }


  public HandleEditAppointmentDetails = (buttonId:any) => {
  if (buttonId=='submitEditAppointment'){
    for (const prop in this.CurrentAppointmentDetailsFormErrorMsg) {
      if (this.AppointmentDetailsForm.controls[prop].hasError('required')) {
        this.CurrentAppointmentDetailsFormErrorMsg[prop] = `${prop} is required`
        this.AddLocalError(prop)
      }
    }
    console.log(this.AppointmentDetailsForm)
  
    if (this.AppointmentDetailsForm.status == 'VALID') { // must now check in my database for the user
      let DateTemp = this.AppointmentDetailsForm.controls['Date'].value
      let Time = this.AppointmentDetailsForm.controls['Time'].value

     
  
      let date = new Date(DateTemp)
      console.log('date',date)
      let year = date.getFullYear()
      let month = String(date.getMonth() + 1).padStart(2, '0')
      let day = String(date.getDate()).padStart(2, '0')
      let finalBirthdate = [day, month, year].join('/')
      
      console.log(Time,finalBirthdate)
  
      this.CurrentAppointmentDetailsForm.Date=finalBirthdate
      this.CurrentAppointmentDetailsForm.Time=Time
      let FinalString = `${this.CurrentAppointmentDetailsForm.Date} ${this.CurrentAppointmentDetailsForm.Time}`
      console.log('current created object ',FinalString)
      // this.ConfrimEditAppointmentDetails(this.CurrentAppointmentDetailsForm)
      this.EditAppointmentDetails(this.currentSelectedSlot.appointmentId,FinalString)
    }
  
  }
  
  
  
  
  }

  public HandleEditPatientVitals = (buttonId:any) => {
    if (buttonId=='submitEditVitals'){
      for (const prop in this.CurrentPatientVitalsFormErrorMsg) {
        if (this.PatientVitalsForm.controls[prop].hasError('required')) {
          this.CurrentPatientVitalsFormErrorMsg[prop] = `${prop} is required`
          this.AddLocalError(prop)
        }
        if (this.PatientVitalsForm.controls[prop].hasError('min')) {
          // console.log('the eror',this.PatientVitalsForm.controls[prop].errors?.['min'])
          let minValue =this.PatientVitalsForm.controls[prop].errors?.['min'].min
          this.CurrentPatientVitalsFormErrorMsg[prop] = `${prop} must be greater than ${minValue}`
          this.AddLocalError(prop)
        }

        if (this.PatientVitalsForm.controls[prop].hasError('max')) {
          // console.log('the eror',this.PatientVitalsForm.controls[prop].errors?.['max'])
          let maxValue =this.PatientVitalsForm.controls[prop].errors?.['max'].max
          this.CurrentPatientVitalsFormErrorMsg[prop] = `${prop} must be less than ${maxValue}`
          this.AddLocalError(prop)
        }
    
    
        // if (this.PatientVitalsForm.controls[prop].hasError('pattern')) {
        //   this.CurrentPatientVitalsFormErrorMsg[prop] = `numbers only allowed`
        //   this.AddLocalError(prop)
        // }
      }
      console.log(this.PatientVitalsForm)
    
      if (this.PatientVitalsForm.status == 'VALID') { // must now check in my database for the user
        let Temperature = this.PatientVitalsForm.controls['Temperature'].value
        let Oxygen = this.PatientVitalsForm.controls['Oxygen'].value
        let LowerBloodPressure = this.PatientVitalsForm.controls['LowerBloodPressure'].value
        let UpperBloodPressure = this.PatientVitalsForm.controls['UpperBloodPressure'].value
        let SmokingStatus = this.PatientVitalsForm.controls['SmokingStatus'].value
        let Weight = this.PatientVitalsForm.controls['Weight'].value
  
        this.CurrentPatientVitalsForm.Temperature=Temperature
        this.CurrentPatientVitalsForm.Oxygen=Oxygen
        this.CurrentPatientVitalsForm.LowerBloodPressure=LowerBloodPressure
        this.CurrentPatientVitalsForm.UpperBloodPressure=UpperBloodPressure
        this.CurrentPatientVitalsForm.SmokingStatus=SmokingStatus
        this.CurrentPatientVitalsForm.Weight=Weight
        console.log('current vitals0 are',this.CurrentPatientVitalsForm)
        // this.ConfirmEditPatientVitals(this.CurrentPatientVitalsForm)
        let currentVitals={
          Temperature:parseInt(this.CurrentPatientVitalsForm.Temperature),
          UpperBloodPressure: parseInt(this.CurrentPatientVitalsForm.UpperBloodPressure),
          LowerBloodPressure: parseInt(this.CurrentPatientVitalsForm.LowerBloodPressure),
          Weight: parseInt(this.CurrentPatientVitalsForm.Weight),
          OxygenSaturation: parseInt(this.CurrentPatientVitalsForm.Oxygen),
          SmokingStatus: this.CurrentPatientVitalsForm.SmokingStatus
        }
        this.EditAppointmentVitals(this.currentSelectedSlot.appointmentId,currentVitals)
      }
    
    }
    
    
    
    
    }
  


  public TogglePopUp(){
    // this.resetAll()
    const popUpLayerEditPatient = document.querySelector('.popUpLayerEditPatient')
    popUpLayerEditPatient?.classList.toggle('visible')

    const popUpEditPatient = document.querySelector('.popUpEditPatient')
    popUpEditPatient?.classList.toggle('popUpCloseEditPatient')
    this.resetOnClose()
}




public resetOnClose(){
  this.RemovePublicError()
  try{
    for (const currentField in this.CurrentPatientDetailsFormErrorMsg) {
      let currentMsg: any = document.querySelector(`#${currentField}Span`)
      currentMsg.classList.remove('errorAdded')
    }
  }
  catch{
    console.log('error');
  }


  try{
    for (const currentField in this.CurrentAppointmentDetailsFormErrorMsg) {
      let currentMsg: any = document.querySelector(`#${currentField}Span`)
      currentMsg.classList.remove('errorAdded')
    }
  }
  catch{
    console.log('error');
  }

  try{
    for (const currentField in this.CurrentPatientVitalsFormErrorMsg) {
      let currentMsg: any = document.querySelector(`#${currentField}Span`)
      currentMsg.classList.remove('errorAdded')
    }
  }
  catch{
    console.log('error');
  }
 
 

}


public PublicError='' // that will be sent to the child
public EditPatientDetails = (CurrentPatientDetails:any,PatientId:any) => {
  console.log('the input data',CurrentPatientDetails)
  this.patientsService.editPatient(CurrentPatientDetails,PatientId).subscribe({
  next:(data:any)=>{
    console.log(data)
    if (data.actionCompleted){ // just send 
      this.ConfirmEditPatientDetails(true)
    }
    else { // here must raise the error on the view
      this.PublicError=data.message
      this.AddPublicError()
      this.ConfirmEditPatientDetails(false)
    }
  },
 })
}


public EditAppointmentDetails = (AppointmentId:any,StartDateTime:any) => {
  this.appointmentsService.editAppointment(AppointmentId,StartDateTime).subscribe({
  next:(data:any)=>{
    console.log(data)
    if (data.actionCompleted){ // just send 
      console.log('succ in edit appo')
      this.ConfrimEditAppointmentDetails(true)
    }
    else { // here must raise the error on the view
      this.PublicError=data.message
      this.AddPublicError()
      this.ConfrimEditAppointmentDetails(false)
    }
  },
 })


}


public EditAppointmentVitals = (AppointmentId:any,AllVitals:any) => {
  console.log('app id',AppointmentId)
  console.log('vitals',AllVitals)
  this.appointmentsService.editVitals(AppointmentId,AllVitals).subscribe({
  next:(data:any)=>{
    console.log('in edit vitals',data)
    if (data.actionCompleted){ // just send 
      console.log('succ in edit appo')
      this.ConfirmEditPatientVitals(true)
    }
    else { // here must raise the error on the view
      this.PublicError=data.message
      this.AddPublicError()
      this.ConfirmEditPatientVitals(false)
    }
  },
 })


}


public allVitals:any ={}

public getVitals(AppointmentId:any){ // send the id of the current appointment
  this.appointmentsService.getVitals(AppointmentId).subscribe({
    next:(data:any)=>{
      console.log('get vitals func',data)
      this.allVitals= data
    },
    complete:()=>{
      if(this.allVitals!=null){ // i will fill the fields 
        console.log('in not null');
        console.log('this.allvitals',this.allVitals);
        this.PatientVitalsForm.controls['Temperature'].setValue(this.allVitals.temperature)       
        this.PatientVitalsForm.controls['UpperBloodPressure'].setValue(this.allVitals.upperBloodPressure)       
        this.PatientVitalsForm.controls['LowerBloodPressure'].setValue(this.allVitals.lowerBloodPressure)       
        this.PatientVitalsForm.controls['Weight'].setValue(this.allVitals.weight)   
        this.PatientVitalsForm.controls['Oxygen'].setValue(this.allVitals.oxygenSaturation)   
        this.PatientVitalsForm.controls['SmokingStatus'].setValue(this.allVitals.smokingStatus)   
      }
      else{ // reset the values in case no vitals were set yet
        this.PatientVitalsForm.controls['Temperature'].setValue('')       
        this.PatientVitalsForm.controls['UpperBloodPressure'].setValue('')       
        this.PatientVitalsForm.controls['LowerBloodPressure'].setValue('')       
        this.PatientVitalsForm.controls['Weight'].setValue('')   
        this.PatientVitalsForm.controls['Oxygen'].setValue('')   
        this.PatientVitalsForm.controls['SmokingStatus'].setValue('')   
      }

    }
   })

}


public EMRerrorMsg='Note: You Can Only Upload Files on The Day of The Consultation!'

public getEMR(AppointmentId:any){ // send the id of the current appointment
  this.appointmentsService.getEMR(AppointmentId).subscribe({
    next:(data:any)=>{
      this.currentEMR= data
      console.log('in next',data)
    },
    complete:()=>{
    }
   })
}

public fileToUpload: File | null = null;
public handleFileInput(files: any) {
  console.log('in handle file')
  this.fileToUpload = files.files.item(0);
  console.log('the currentday date',this.currentSelectedSlot)
  // console.log('the appoitment id',this.currentSelectedSlot)
  this.editEMR(this.currentSelectedSlot.appointmentId,this.fileToUpload) // automacally will upload

}

public editEMR(AppointmentId:any,File:any){ // send the id of the current appointment
  this.ToggleLoadingIndicator() // loading
  this.appointmentsService.editEMR(AppointmentId,File).subscribe({
    next:(data:any)=>{
      console.log('in edit',data)
      if(data.actionCompleted){ // no errors
          this.getEMR(AppointmentId)
          this.EMRerrorMsg='File Successfully Uploaded!'
      }
      else{
        this.EMRerrorMsg=data.message
      }
    },
    complete:()=>{
      setTimeout(() => { // just wait 2.5 more secs
        this.ToggleLoadingIndicator() // loading
      }, 1000);
    }
   })

}


public deleteEMR(DocumentId:any){ // send the id of the current appointment
  this.ToggleLoadingIndicator() // loading
  this.appointmentsService.deleteEMR(DocumentId).subscribe({
    next:(data:any)=>{
      if(data.actionCompleted){
        this.getEMR(this.currentEMR.appointmentId) // to update the view
        this.EMRerrorMsg='File Successfully Deleted!'
      }
      else{
        this.EMRerrorMsg=data.message
      }
      console.log('in delete doc',data)
    },
    complete:()=>{
      setTimeout(() => { // just wait 2.5 more secs
        this.ToggleLoadingIndicator() // loading
      }, 1000);
    }
   })

}

public handlePrint(filePath:any){
  console.log('in print',filePath);
  let OpenUrl =`http://shaheersherif-001-site1.gtempurl.com/${filePath}`
  window.open(OpenUrl, "_blank");
  // console.print(OpenUrl)
}

public Uploading =false
public ToggleLoadingIndicator(){
  if (this.Uploading){
    this.Uploading=false
  }
  else{
    this.Uploading=true
  }
}

 
 
 

}
