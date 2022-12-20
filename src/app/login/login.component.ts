import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeadersInterceptor } from '../headers.interceptor';
import { Users } from '../models/Users';
import { AuthenticationService } from '../Shared/authentication.service';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit{
  LoginForm: FormGroup;
  loginDetails: any;
  userinfo: any=[];
  uesrname: string;
  password: any;
  constructor(formGroup: FormBuilder,
     private AuthService: AuthenticationService,
     private router: Router ) 
     {
    this.LoginForm = formGroup.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.Login();
  }
  Login() {
    if(this.LoginForm.valid){
      this.AuthService.Login(this.LoginForm.value).subscribe(res=>{
        if(res?.token){
          // console.log(res);
          localStorage.clear();
           localStorage.setItem('token', (res.token));
          // this.intercept.intercept("JWT",JSON.stringify(res.Token));
          this.AuthService.isLoggedIn = true;
          this.router.navigate(['/home']);
        }
      });
    }
   
      
      
  }
}
