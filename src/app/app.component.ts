import {  Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthenticationService } from './Shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OrderManagement';
  message: Subject<string> = new BehaviorSubject('loading :(');

  constructor(private router: Router, public AuthService: AuthenticationService) {}
  

  logout(): void {
    localStorage.removeItem('token');
    this.AuthService.isLoggedIn = false;
    //this.router.navigate(['/login']);
  }
}
