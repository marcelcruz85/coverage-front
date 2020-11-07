import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CourtsService {
  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.getToken();
  }

  async getToken(){
    const ret = await Storage.get({ key: 'TOKEN_KEY' });
    this.token = JSON.parse(ret.value);
    console.log(this.token);
  }

  findMyCourts(){
    return this.http.get(`${environment.strapiProxy}/find-courts`);
  }

  findOneCourt(id: string){
    return this.http.get(`${environment.strapiProxy}/find-one-court/${id}`);
  }

  updateCourt(id: string, data){
    return this.http.put(`${environment.strapiProxy}/update-court/${id}`, data);
  }
}
