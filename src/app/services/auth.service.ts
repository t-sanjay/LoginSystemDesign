import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpCLient: HttpClient) { }

  login(data): Observable<any>{
    return this.httpCLient.post<any>(`${environment.API_URL}/Auth/login`, data);
  }

  register(data): Observable<any>{
    return this.httpCLient.post<any>(`${environment.API_URL}/Auth/register`, data);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.clear();
  }

  isUserAdmin(){
    const tokenData = this.decodedToken()!;
    if(tokenData.role === 'admin'){
      return true;
    }
    return false;
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  // getfullNameFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.name;
  // }

  // getRoleFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.role;
  // }

  // renewToken(tokenApi : TokenApiModel){
  //   return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  // }
}
