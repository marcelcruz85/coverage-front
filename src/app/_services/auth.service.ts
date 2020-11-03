import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(identifier: string, password: string){
    return this.http.post(`${environment.url}/auth/local`, {
      identifier,
      password
    });
  }

  forgot(email: string){
    return this.http.post(`${environment.url}/auth/forgot-password`, {
      email
    });
  }
}
