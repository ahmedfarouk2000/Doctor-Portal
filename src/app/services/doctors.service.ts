import { Injectable } from '@angular/core';
import { IDoctor } from 'src/models/IDoctor';
import { BehaviorSubject } from "rxjs";
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }


  // private Doctor = new BehaviorSubject<IDoctor>({ // the current doctor
  //   id: 0,
  //   name: '',
  //   email: '',
  //   phone: 0,
  //   password: ''
  // });

  // public setDoctor(DoctorInput: IDoctor): void { // so any one can access this doctor globally
  //   this.Doctor.next(DoctorInput)
  // }

  // public getDoctor(): BehaviorSubject<IDoctor>  { // so any one can access this doctor globally
  //   return this.Doctor
  // }

  public Login(enteredEmail: string, enteredPassword: string){ // used for login
    return this.http.post<any>(`http://shaheersherif-001-site1.gtempurl.com/api/Accounts/Login`, 
    {
      Email:enteredEmail,
      Password:enteredPassword
    });
  }

  public Logout(){
    localStorage.removeItem('token') // once its removed it will redirect you to login
    this.router.navigate(['/login'])
  }



  public BaseUrl:string ='http://shaheersherif-001-site1.gtempurl.com/api/Doctors'

  public getConsultationDuration(){
    return this.http.get(`${this.BaseUrl}/GetConsultationDuration`)
  }

  public getWorkHours(){
    return this.http.get(`${this.BaseUrl}/GetWorkHours`)
  }

  public getDaysOff(){
    return this.http.get(`${this.BaseUrl}/GetDaysOff`)
  }



}
