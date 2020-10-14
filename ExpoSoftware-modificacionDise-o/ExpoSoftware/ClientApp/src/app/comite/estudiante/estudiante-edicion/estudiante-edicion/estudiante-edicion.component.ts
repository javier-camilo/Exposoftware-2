import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/comite/asignatura/models/asignatura';
import { MatDialog } from '@angular/material/dialog';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from 'src/app/comite/estudiante/models/estudiante';
import { DocenteService } from 'src/app/services/docente.service';
import { AreaService } from 'src/app/services/area.service';
import { Router, ActivatedRoute } from '@angular/router';


let options: NgbModalOptions = {
  size: 'xl'
};

@Component({
  selector: 'app-estudiante-edicion',
  templateUrl: './estudiante-edicion.component.html',
  styleUrls: ['./estudiante-edicion.component.css']
})
export class EstudianteEdicionComponent implements OnInit 
{

  formGroup:FormGroup;
  estudiante:Estudiante;
  asignaturas:Asignatura[];

  constructor(private estudianteService : EstudianteService, private dialog : MatDialog,
    private formBuilder: FormBuilder, private modalService : NgbModal, private rutaActiva : ActivatedRoute, private asignaturaService : AsignaturaService) { }

  ngOnInit(): void {
    this.estudiante = new Estudiante();
    const id = this.rutaActiva.snapshot.params.identificacion;
    this.estudianteService.getId(id).subscribe(p => {
      this.estudiante = p;
      this.estudiante != null ? null : this.inicializarError();
    });

  }


  iniciarAsignaturas(){

    this.asignaturaService.get("").subscribe(result=>{this.asignaturas=result;
      if(this.asignaturas.length===0){
        this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: "debe digilenciar las asignaturas habilitadas para poder digilenciar el formulario", EsMensaje: "true"}});
      }
    });

  }

  confirmar(operacion:string){

    let dialogo= this.dialog.open(CuadroDialogoComponent, {data:{name:"Advertencia", descripcion:"¿esta seguro de realizar esta accion?"} } );

    dialogo.afterClosed().subscribe(result => {
      

        if (operacion=="1") {
          this.update(result);
        } else if(operacion=="2"){
          this.delete(result);
        }


      }

    );

  }

  update(confirmacion:string){
    if(confirmacion=="true")this.estudianteService.put(this.estudiante).subscribe();
  }

  
  delete(confirmacion:string){
    
    if(confirmacion=="true")this.estudianteService.delete(this.estudiante.identificacion).subscribe();

  }



  inicializarError(){

    this.estudiante = new Estudiante();
    this.estudiante.identificacion="...";
    this.estudiante.asignatura="Seleccionar..."
    this.estudiante.correo="";
    this.estudiante.nombre="";
    this.estudiante.celular="";

    this.resultado("Error","Se produjo un error al consultar el estudiante a editar");

  }

  resultado(operacion:string, mensaje:string){

    this.dialog.open(CuadroDialogoComponent, {data: {name:operacion, descripcion: mensaje, EsMensaje: "true"}});
    
  }

}


