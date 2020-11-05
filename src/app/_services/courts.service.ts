import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  constructor(
    private http: HttpClient
  ) { }

  findMyCourts(){
    return this.http.get(`${environment.sugarUrl}/find-courts`);
  }
}
