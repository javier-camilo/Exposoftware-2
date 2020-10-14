import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rubrica } from '../models/rubrica';
import { Area } from '../../area/model/area';
import { AreaService } from 'src/app/services/area.service';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { MatDialog } from '@angular/material';
import { RubricaService } from 'src/app/services/rubrica.service';

@Component({
  selector: 'app-rubrica-registro',
  templateUrl: './rubrica-registro.component.html',
  styleUrls: ['./rubrica-registro.component.css']
})
export class RubricaRegistroComponent implements OnInit {

  rubricaForm: FormGroup;
  rubrica:Rubrica;
  areas:Area[];

  constructor(private formBuilder: FormBuilder,private areaService:AreaService,private dialog:MatDialog,
    private rubricaService:RubricaService
    ) { }

  ngOnInit(): void {

    this.rubrica=new Rubrica();
    this.inicializar();
    this.cargarAreas();
    this.buildForm();


  }

  inicializar(){
    this.rubrica.idRubrica="";
    this.rubrica.titulo="";
    this.rubrica.codigoArea="";

  }

  cargarAreas(){

    this.areaService.get("").subscribe(result=>{

      this.areas=result;

      if(this.areas==null){

          this.resultado("Permiso denegado","No hay areas a las cuales asignarles rubrica");
 
      }

    });

  }

  private buildForm(){

    this.rubricaForm = this.formBuilder.group({
      idRubrica: [this.rubrica.idRubrica, [Validators.required, Validators.maxLength(4)]],
      titulo : [this.rubrica.titulo, Validators.required],
      codigoArea : [this.rubrica.codigoArea, Validators.required]
    });

  }


  submit() {
    if (!this.rubricaForm.valid) {
      return;
    }
    this.rubrica=this.rubricaForm.value;
    this.rubricaService.post(this.rubrica," ").subscribe(result=>this.rubrica=result);
  }


  confirmar(){

    let dialogo= this.dialog.open(CuadroDialogoComponent, {data:{name:"Advertencia", descripcion:"¿esta seguro de realizar esta accion?"} } );

    dialogo.afterClosed().subscribe(result => {
      

        if (result=="true") {

          this.submit();

        }

      }

    );

  }


  
  resultado(operacion:string, mensaje:string){

    this.dialog.open(CuadroDialogoComponent, {data: {name:operacion, descripcion: mensaje, EsMensaje: "true"}});
    
  }


}
