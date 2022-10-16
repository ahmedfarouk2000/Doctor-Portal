import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = 'http://shaheersherif-001-site1.gtempurl.com/api'
 
  constructor(private http:HttpClient) { 
  }


  public loginDoctor(data:Observable<any>):Observable<any>{
    return this.http.post(`${this.baseUrl}/Accounts/Login`,data)
  }
  public logOut():Observable<any>{
    return this.http.get(`${this.baseUrl}/Accounts/Signout`)
  }

}
