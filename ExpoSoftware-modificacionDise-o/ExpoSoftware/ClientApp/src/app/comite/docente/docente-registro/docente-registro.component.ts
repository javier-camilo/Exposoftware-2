import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../asignatura/models/asignatura';
import { AsignaturaService } from 'src/app/services/asignatura.service';

import { Docente } from '../../docente/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { MatDialog } from '@angular/material/dialog';
import { AsignaturaConsultaComponent } from '../../asignatura/asignatura-consulta/asignatura-consulta.component';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { from } from 'rxjs';
import { deprecate } from 'util';
import { AreaService } from 'src/app/services/area.service';
import { Area } from '../../area/model/area';

let options: NgbModalOptions = {
  size: 'xl'
};


@Component({
  selector: 'app-docente-registro',
  templateUrl: './docente-registro.component.html',
  styleUrls: ['./docente-registro.component.css']
})

export class DocenteRegistroComponent implements OnInit {

  areas:Area[];
  asignaturas:Asignatura[];


  formGroup:FormGroup;
  docente:Docente;
  respuesta:string;
  TipoDocente:string;
  TipoArea:string;

  constructor(private asignaturaService:AsignaturaService,private docenteService: DocenteService, private dialog : MatDialog,
   private formBuilder: FormBuilder, private modalService: NgbModal, private areaService:AreaService) { }


  ngOnInit(): void {
    this.comprobar();
    this.TipoDocente="Selecionar...";
    this.TipoArea="Selecionar...";
    this.docente = new Docente();
    this.buildForm();
  }

  private buildForm(){
    this.docente.identificacion="";
    this.docente.nombre="";
    this.docente.descripcion="";
    this.docente.tipo="Selecionar...";
    this.docente.asignaturas = "Selecionar...";
    this.docente.area="Selecionar...";

    this.formGroup = this.formBuilder.group({
      identificacion : [this.docente.identificacion, [Validators.required, Validators.maxLength(10)]],
      nombre : [this.docente.nombre , [Validators.required]],
      descripcion : [this.docente.descripcion, [Validators.required]],
      tipo : [this.docente.tipo, this.ValidaTipo],
      asignaturas : [this.docente.asignaturas, this.ValidaAsignaturas],
      area : [this.docente.area]

    })
  }

private ValidaTipo(control : AbstractControl){
  const tipo = control.value;

  if(tipo === "Selecionar..."){
    return{validTipo: true, message: "debe seleccionar un valor en el combo"}
  }
   return null;

}

private ValidaAsignaturas(control : AbstractControl){
  const asignatura = control.value;

  if(asignatura === "Selecionar..."){
    return{validAsignaturas: true, message: "debe seleccionar un valor en el combo"}
  }

  return null;
}

get control(){
  return this.formGroup.controls;
}

onSubmit(){
 // if(this.formGroup.invalid){ return; }
  
  this.confirmarGuardado();

}

confirmarGuardado(){
    
  let ref = this.dialog.open(CuadroDialogoComponent, {data: {name:"Guardar", descripcion:"¿Desea Guardar?"}});

    ref.afterClosed().subscribe(result => {
      this.respuesta=result;
      this.add(this.respuesta);
    })

}

add(resultado : string){

  this.docente = this.formGroup.value;

  if(resultado=="true"){
    this.docenteService.post(this.docente,"si").subscribe(p => {
      this.docente=p;
    });
  }

}

  buscar(){
      const modalRef = this.modalService.open(ModalComponent,options);
      modalRef.componentInstance.name="consultaDocente";
  }

  mensaje():void{

  }

  comprobar(){

    this.asignaturaService.get("").subscribe(result => {
      this.asignaturas = result;
      if(this.asignaturas.length===0){
        
        this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: "debe digilenciarlas asignatruas habilitadas para poder registrar los docentes", EsMensaje: "true"}});
        
      }
    });


    this.areaService.get("").subscribe(result => {this.areas=result});

  }

}
