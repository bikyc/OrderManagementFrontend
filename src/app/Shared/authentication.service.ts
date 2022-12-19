import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  serviceURL: string;

  constructor(private httpClient: HttpClient) {
    this.serviceURL = 'https://localhost:44335/api';
  }

 
  Login(userDetials: Users): Observable<any> {
    return this.httpClient.post(this.serviceURL + '/Login/login', userDetials, {responseType : 'json'});
  }

  Register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(this.serviceURL + '/Login/login', { username,
    email,password});
  }
}
