import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(
    private http: HttpClient
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${environment.url}/auth/local`, {
      identifier,
      password
    }).pipe(
      map((data: any) => data.jwt),
      switchMap(jwt => {
        return from(Storage.set({key: TOKEN_KEY, value: jwt}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  forgot(email: string){
    return this.http.post(`${environment.url}/auth/forgot-password`, {
      email
    });
  }

  reset(password: string, passwordConfirmation: string, code: string){
    return this.http.post(`${environment.url}/auth/reset-password`, {
      code,
      password,
      passwordConfirmation,
    });
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
