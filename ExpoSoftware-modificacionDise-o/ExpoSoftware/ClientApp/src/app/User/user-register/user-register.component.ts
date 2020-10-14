import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user : User;
  userGroup : FormGroup;
  readonly roles: string[] = ["Docente acesor", "Comite",  "Docente evaluador"]

  constructor(private authService : AuthService, private formBuilder : FormBuilder, private router : Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    
    this.buildForm();
    
  }

 private buildForm (){
 

   this.userGroup = this.formBuilder.group({
     userName: ["", [Validators.required]],
     email: ["", [Validators.required, Validators.email]],
     password: ["", [Validators.required]],
     rol : ["", [Validators.required]]

   });

 }

 get control(){
  return this.userGroup.controls;
}

 onSubmit(){
   if(this.userGroup.invalid){
     return;
   }

   this.user = {
     userName : this.control["userName"].value,
     email : this.control["email"].value,
     password : this.control["password"].value,
     rol : this.control["rol"].value

   }

   this.authService.registerUser(this.user).subscribe(p => {
     this.user = p;

     if(p!=null){
      this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: "Se registro correctamente el usuario: " + this.user.userName, EsMensaje: "true"}});
     }

   })

 }



}
