import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { ActivatedRoute } from '@angular/router';
import { Area } from '../model/area';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-area-edicion',
  templateUrl: './area-edicion.component.html',
  styleUrls: ['./area-edicion.component.css']
})
export class AreaEdicionComponent implements OnInit {

  area:Area;
  formGroup: FormGroup;
  codigo:string;

  constructor(private formBuilder: FormBuilder,private rutaActiva: ActivatedRoute,private areaService:AreaService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this.area=new Area();
    const id = this.rutaActiva.snapshot.params.codigoArea;
    this.areaService.getId(id).subscribe(resul => {
      
      this.area=resul;
      
      this.area != null ? null : this.inicializarError();

    });
    
    
  }



  inicializarError(){

    this.area=new Area();

    this.area.codigoArea="..";
    this.area.nombreArea="..";

  }


  onSubmit(operacion:string) {
      this.confirmar(operacion);
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
  delete(result: any) {
    if(result=="true"){
      this.areaService.delete(this.area).subscribe();
    }
  }

  update(result: any) {
    if(result=="true"){
       this.areaService.put(this.area).subscribe();
    }
  }
  

}
