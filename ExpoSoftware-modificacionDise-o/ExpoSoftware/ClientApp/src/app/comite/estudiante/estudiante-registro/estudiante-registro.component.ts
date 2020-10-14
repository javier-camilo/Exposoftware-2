import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from '../../asignatura/models/asignatura';
import { MatDialog } from '@angular/material/dialog';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from '../models/estudiante';
import { DocenteService } from 'src/app/services/docente.service';
import { AreaService } from 'src/app/services/area.service';
import { Router } from '@angular/router';

let options: NgbModalOptions = {
  size: 'xl'
};

@Component({
  selector: 'app-estudiante-registro',
  templateUrl: './estudiante-registro.component.html',
  styleUrls: ['./estudiante-registro.component.css']
})
export class EstudianteRegistroComponent implements OnInit {

  asignaturas:Asignatura[];
  formGroup : FormGroup;
  estudiante : Estudiante;
  
  respuesta : string;

  constructor(private estudianteService: EstudianteService, private dialog : MatDialog,
    private formBuilder : FormBuilder, private modalService : NgbModal, private asignaturaService : AsignaturaService, private router: Router) { }

  ngOnInit(): void {
    this.estudiante = new Estudiante();
    this.buildForm();
    this.iniciarAsignaturas();

  }

  iniciarAsignaturas(){
    this.asignaturaService.get("").subscribe(result => {this.asignaturas=result;
    if(this.asignaturas.length===0){
     this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor usuario", descripcion: "debe digilenciar las asignaturas habilitadas para poder digilenciar el formulario", EsMensaje: "true"}});
    }

    });
  }

  private buildForm(){

    this.estudiante.identificacion="";
    this.estudiante.nombre="";
    this.estudiante.asignatura="seleccionar";
    this.estudiante.correo="";
    this.estudiante.celular="";
 


    this.formGroup = this.formBuilder.group({
      identificacion: [ this.estudiante.identificacion, [Validators.required, Validators.maxLength(10)] ],
      nombre: [ this.estudiante.nombre, [Validators.required]],
      asignatura: [this.estudiante.asignatura, this.ValidaAsignatura ],
      correo: [this.estudiante.correo, [Validators.email, Validators.required] ],
      celular: [this.estudiante.celular, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      
    });

  }

  private ValidaAsignatura(control : AbstractControl){
    const asignatura=control.value;

    if(asignatura ==="seleccionar"){
      return{ Validar: true, message:"debe solucionar un valor" }
    }

    return null;
  }

  get control(){
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid){
      return;
    }
      this.confirmarGuardado();
      
  }

  confirmarGuardado(){
    let ref = this.dialog.open(CuadroDialogoComponent, {data: {name:"Guardar", descripcion:"¿Desea guardar?"}})
    ref.afterClosed().subscribe(result => {
      this.respuesta=result;
      this.add(this.respuesta);
    })

  }

  add(resultado:string){


    this.estudiante = this.formGroup.value;

    if (resultado=="true") {

      this.estudianteService.post(this.estudiante).subscribe(p => {
        this.estudiante=p;
      });

      this.router.navigateByUrl('/estudianteConsulta');

    } 


  }



  


}


