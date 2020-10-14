import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { User } from '../models/user';
import { GroupedObservable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { LoginRequest } from '../models/login-request';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginRequest : LoginRequest;
  loginGroup : FormGroup;

  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router) { }

  ngOnInit(): void {
   
    this.buildForm();
  }

  private buildForm(){
    

    this.loginGroup = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
     
    })

  }

  get control(){
    return this.loginGroup.controls;
  }

  onSubmit(){
    if(this.loginGroup.invalid){
      return;
    }
    this.loginRequest = {
      userNameorEmail : this.control["userName"].value,
      password : this.control["password"].value

    }

    this.authService.loginUser(this.loginRequest).subscribe(p => {

      if(p){
        this.authService.setUser(p);
        this.router.navigateByUrl('/');
      }

    })

  }


}
