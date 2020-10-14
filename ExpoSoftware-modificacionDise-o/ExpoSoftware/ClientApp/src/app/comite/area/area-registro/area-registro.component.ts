import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Area } from '../model/area';
import { MatDialog } from '@angular/material/dialog';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area-registro',
  templateUrl: './area-registro.component.html',
  styleUrls: ['./area-registro.component.css']
})
export class AreaRegistroComponent implements OnInit {

  formGroup: FormGroup;
  area:Area;
  respuesta:string;
  
  constructor(private formBuilder: FormBuilder,private dialog:MatDialog,private areaService:AreaService) { }

  ngOnInit(): void {

    this.area=new Area();
    this.buildForm();
    
  }

  private buildForm(){
    
    this.area.codigoArea="";
    this.area.nombreArea="";

    
  this.formGroup = this.formBuilder.group({

        codigoArea: [this.area.codigoArea, [Validators.required, Validators.maxLength(2)]],
        nombreArea: [this.area.nombreArea, Validators.required]

        });


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
    
    let ref = this.dialog.open(CuadroDialogoComponent, {data: {name:"Guardar", descripcion:"¿desea Registrar Los Datos?"}});

      ref.afterClosed().subscribe(result => {
        this.respuesta=result;
        this.add(this.respuesta);
      })

  }

  add(resultado:string){

    
    this.area=this.formGroup.value;
    
    if (resultado=="true") {

      this.areaService.post(this.area).subscribe();

    } 


  }



}


