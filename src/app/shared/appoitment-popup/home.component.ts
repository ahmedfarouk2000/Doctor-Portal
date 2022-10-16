import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';
import { IPatient } from 'src/models/IPatient';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { PatientDetailsService } from 'src/app/services/patient-details.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @Input() Date: any = '' // date + time
  @Input() Day: any = '' // day name 
  @Input() Duration: any = '' // to toggle if this is true 
  @Output() onClick: EventEmitter<IPatient> = new EventEmitter<IPatient>()
  public Confirm(Patient: IPatient) {
    this.onClick.emit(Patient); // the value passed from the child
  }



  public CurrentSelected: IPatient = {
    patientId: 0,
    patientName: '',
    phoneNumber: 0,
    birthDate: '',
    height: 0,
    gender: '',
    appointments: [], // make model for it
    lastVisitDate: ''
  }

  public disabledButton: boolean = true // by default the button is disabled until it select an input from dropdown
  public notFound = false // default is false until we search and find 0 matches (length==0) 

  public AllPatients: IPatient[] = [] // will contain all the patients here
  public AllSearchResults: IPatient[] = [] // will contain all patients searched on (temped array)

  constructor(
    // private doctorsService: DoctorsService,
    private patientsService: PatientDetailsService,
    private appointmentsService: AppointmentsService,
    private doctorsServices: DoctorsService

  ) { }

  ngOnInit(): void {
    this.getAllPatients()
    this.ToggleDropDown()
  }
  public getAllPatients() {
    this.patientsService.getAllPaitents().subscribe({
      next: (data: any) => {
        console.log('the data', data)
        this.AllPatients = data
        this.AllSearchResults = data
      }
    })
  }


  public getAppointments() {
    this.appointmentsService.getAllAppointments().subscribe({
      next: (data: any) => {
        console.log('all apointments', data)
      }
    })
  }

  public getConsultationDuration() {
    this.doctorsServices.getConsultationDuration().subscribe({
      next: (data: any) => {
        console.log('the constulationDuration', data)
      }
    })
  }

  public getWorkHours() {
    this.doctorsServices.getWorkHours().subscribe({
      next: (data: any) => {
        console.log('the working hours', data)
      }
    })
  }

  public getDaysOff() {
    this.doctorsServices.getDaysOff().subscribe({
      next: (data: any) => {
        console.log('all days off', data)
      }
    })
  }

  public Logout() {
    this.doctorsServices.Logout();
  }





  public setSelected = (selected: IPatient) => { // WILL TAKE THE ENTIRE SELECTED PATIENT OBJECT 
    this.CurrentSelected = { ...selected }
    this.putValueInInput(this.CurrentSelected.patientName)
    console.log('the currentslecte', this.CurrentSelected)
    this.EnableButton() // will be enable only if he selected a value from the dropdown // writing the name is not enough

  }

  public DisableButton = () => {
    this.disabledButton = true
  }

  public EnableButton = () => {
    this.disabledButton = false
  }

  public putValueInInput(name: string): void {
    const input: any = document.querySelector('.input')
    input.value = name
    this.ToggleDropDown()
  }

  public ToggleDropDown = () => {
    const dropDown: any = document.querySelector('#dropDown')
    dropDown.classList.toggle('vertical-menu-closed')
  }
  public OpenDropDown = () => {
    const dropDown: any = document.querySelector('#dropDown')
    // console.log(dropDown.classList)
    dropDown.classList.remove('vertical-menu-closed')
  }


  public async searchResult() { // must only apply the loading concept in order not to make request each time i type
    // this.ToggleDropDown() // cant toggle here just add the class
    this.resetSelectedPatient() // will reset it in case user entered data or deleted data after selecting
    this.OpenDropDown()
    const input: any = document.querySelector('.input')

    await this.patientsService.searchPatient(input.value).subscribe({
      next: (data: any) => {
        console.log('the search result', data)
        this.AllSearchResults = [...data]
      },

      complete: () => {
        if (this.AllSearchResults.length == 0) { // no matches were found
          this.notFound = true
          console.log('in true')
        }
        else {
          this.notFound = false
          console.log('in false')
        }
      }


    })
  }

  // public waitUntilStop(){
  //   console.log('here');

  //   const timer = setTimeout(() => {
  //     this.searchResult()
  //   }, 2000) // 3 sec then search
  //   return () => clearTimeout(timer)
  // }



  public resetSelectedPatient(): void {
    this.CurrentSelected = { // reset it
      patientId: 0,
      patientName: '',
      phoneNumber: 0,
      birthDate: '',
      height: 0,
      gender: '',
      appointments: [], // make model for it
      lastVisitDate: ''
    }
    this.DisableButton();
  }

  public TogglePopUp(event: any) {
    console.log(event);
    let currentID = event.id
    if (currentID == 'exitSearch') {
      const popUpLayer = document.querySelector('.popUpLayer')
      popUpLayer?.classList.toggle('visible')

      const popUp = document.querySelector('.popUp')
      popUp?.classList.toggle('popUpClose')

      //check if u are in the confirm page 
      // this.resetSelectedPatient()

    }

    else if (currentID == 'exitConfirm' || currentID == 'confirm' || currentID == 'cancel') {
      const popUpLayer = document.querySelector('.popUpLayer')
      popUpLayer?.classList.toggle('visible')

      const popUp = document.querySelector('.popUp')
      popUp?.classList.toggle('popUpClose')

      setTimeout(() => { // just reset and start from the searchPage
        this.GoNextPage()
      }, 500);


    }

    else if (currentID == 'calenderButton') {
      const popUpLayer = document.querySelector('.popUpLayer')
      popUpLayer?.classList.toggle('visible')

      const popUp = document.querySelector('.popUp')
      popUp?.classList.toggle('popUpClose')

      // this.GoNextPage()
      // this.resetSelectedPatient()

    }



  }

  public GoNextPage() {
    const confirmPage = document.querySelector('#confirmPage')
    confirmPage?.classList.toggle('displayNone')
    const searchPage = document.querySelector('#searchPage')
    searchPage?.classList.toggle('displayNone')
  }

  public openAddPatient() {
    this.SwitchToAddPatient()
    this.ToggleAddPatient()
  }



  public SwitchToAddPatient() {
    const popUpLayer = document.querySelector('.popUpLayer')
    popUpLayer?.classList.toggle('visible')

    const popUp = document.querySelector('.popUp')
    popUp?.classList.toggle('popUpClose')

  }


  public ToggleAddPatient() {
    const popUpLayerAddPatient = document.querySelector('.popUpLayerAddPatient')
    popUpLayerAddPatient?.classList.toggle('visible')

    const popUpAddPateint = document.querySelector('.popUpAddPateint')
    popUpAddPateint?.classList.toggle('popUpCloseAddPatient')

  }

  public getFrom(currentDate:any){
    let tempDate= new Date(currentDate)
    // console.log('the fet from',this.addZero(tempDate.getHours()))
    // console.log('the fet from',this.addZero(tempDate.getMinutes()))
    return `${this.addZero(tempDate.getHours())}:${this.addZero(tempDate.getMinutes())}`
  }

  public getTo(currentDate:any){
    let tempDate= new Date(currentDate)
    tempDate.setMinutes(tempDate.getMinutes() + 30)
    // tempDate.setMinutes(tempDate.getMinutes() + 30)
    // console.log('the TO from',tempDate)
    // console.log('the fet from',this.addZero(tempDate.getHours()))
    // console.log('the fet from',this.addZero(tempDate.getMinutes()))
    return `${this.addZero(tempDate.getHours())}:${this.addZero(tempDate.getMinutes())}`
  }

  public addZero(number: any) {
    let currentNumber = number
    if (number.toString().length == 1) {
      currentNumber = `0${number}`
    }
    return currentNumber // as string
  }








}
