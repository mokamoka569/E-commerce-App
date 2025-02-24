import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;
  private router =inject(Router)
  constructor(private httpClient:HttpClient) { 


  
  }


  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }
  saveTokenData():void{
   this.userData = jwtDecode(JSON.stringify(localStorage.getItem('userToken')))
  }
  logOut():void{
    localStorage.removeItem('userToken')
    this.userData=null
    this.router.navigate(['/login'])
  }


  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }



  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }


  
  setResetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
