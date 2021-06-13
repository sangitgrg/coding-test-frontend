import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

// this service is responsible for calling backend API and returning observable.
//api endpoint is stored in environment.ts file which will change in production mode
export class ApiService {
  apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getbyId(id: any) {
    return this.http.get(`${this.apiUrl}/${id}}`);
  }

  getAll(endpoint: string = '') {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  create(endpoint: string = '', api_model: any) {
    return this.http.post(
      `${this.apiUrl}/${endpoint}`,
      JSON.stringify(api_model),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  update(endpoint: string = '', api_model: any) {
    return this.http.put(
      `${this.apiUrl}/${endpoint}`,
      JSON.stringify(api_model),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  delete(endpoint: string = '') {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
