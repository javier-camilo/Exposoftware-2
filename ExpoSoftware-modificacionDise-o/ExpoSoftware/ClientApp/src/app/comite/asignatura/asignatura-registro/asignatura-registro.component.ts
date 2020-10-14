import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from '../models/asignatura';
import { MatDialog } from '@angular/material/dialog';
import { AsignaturaConsultaComponent } from '../asignatura-consulta/asignatura-consulta.component';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Area } from '../../area/model/area';
import { AreaService } from 'src/app/services/area.service';


let options: NgbModalOptions = {
  size: 'xl'
};

@Component({
  selector: 'app-asignatura-registro',
  templateUrl: './asignatura-registro.component.html',
  styleUrls: ['./asignatura-registro.component.css']
})




export class AsignaturaRegistroComponent implements OnInit {

  


  areas:Area[];
  formGroup: FormGroup;
  asignatura:Asignatura;
  respuesta:string;

  constructor(private asignaturaService: AsignaturaService,private dialog:MatDialog,
    private formBuilder: FormBuilder,private modalService: NgbModal,private areasService:AreaService) { }


  ngOnInit() {
    this.asignatura=new Asignatura();
    this.buildForm();
    this.iniciarAreas();
  }

  iniciarAreas(){

    this.areasService.get("").subscribe(result=>{this.areas=result;
      if(this.areas.length===0){
        this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: "debe digilenciar las areas habilitadas para poder digilenciar el formulario", EsMensaje: "true"}});
      }
    });

  }

  private buildForm(){
    
    this.asignatura.codigoAsignatura="";
    this.asignatura.nombreAsignatura="";
    this.asignatura.areaAsignatura="Selecionar...";
    this.asignatura.descripcionAsignatura="";

    
  this.formGroup = this.formBuilder.group({
        codigoAsignatura: [this.asignatura.codigoAsignatura, [Validators.required, Validators.maxLength(10)]],
        nombreAsignatura: [this.asignatura.nombreAsignatura, Validators.required],
        areaAsignatura: [this.asignatura.areaAsignatura, this.ValidaArea],
        descripcionAsignatura: [this.asignatura.descripcionAsignatura,Validators.required]

        });

  }

  private ValidaArea(control: AbstractControl){

      const area=control.value;

      if(area==="Selecionar..."){
        return{validArea: true, message:"debe seleccionar un valor en el combo"}
      }

      return null;

  }


  get control() { 
    return this.formGroup.controls;
  }
    

  onSubmit() {
      if (this.formGroup.invalid) {
          return;
         }
      this.confirmarGuardado();
   }

    
  confirmarGuardado(){
    
    let ref = this.dialog.open(CuadroDialogoComponent, {data: {name:"Guardar", descripcion:"¿Desea Guardar?"}});

      ref.afterClosed().subscribe(result => {
        this.respuesta=result;
        this.add(this.respuesta);
      })

  }

  add(resultado:string){


    this.asignatura= this.formGroup.value;

    if (resultado=="true") {

      this.asignaturaService.post(this.asignatura).subscribe(p => {
        this.asignatura=p;
      });

    } 


  }


  buscar(){
    const modalRef = this.modalService.open(ModalComponent,options);
    modalRef.componentInstance.name="consultaAsignaturas";
  }



}
