import { Component, OnInit } from '@angular/core';
import { Docente } from '../../docente/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { AreaService } from 'src/app/services/area.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Area } from '../../area/model/area';
import { Asignatura } from '../../asignatura/models/asignatura';
import { MatDialog } from '@angular/material';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-docente-consulta',
  templateUrl: './docente-consulta.component.html',
  styleUrls: ['./docente-consulta.component.css']
})
export class DocenteConsultaComponent implements OnInit {

searchText: string;
docentes : Docente[];
asignatura:Asignatura[];
respuesta:string;
borrar:string;


  constructor(private docenteService : DocenteService, private asignaturaservice:AsignaturaService,private dialog : MatDialog) { }

  ngOnInit() {

    this.searchText="";

      this.docenteService.get("").subscribe(result => {
        this.docentes = result;
      });


      this.asignaturaservice.get("").subscribe(result=>{this.asignatura=result});


  }


  confirmar(docenteEliminar:string){
    
    let ref = this.dialog.open(CuadroDialogoComponent, {data: {name:"Eliminar", descripcion:"¿Desea Eliminar?"}});
  
      ref.afterClosed().subscribe(result => {
        this.respuesta=result;
        this.eliminar(this.respuesta,docenteEliminar);
      })
  
  }

  eliminar(respuesta:string,docenteEliminar:string){

    if(respuesta==="true"){

      this.docenteService.delete(docenteEliminar).subscribe();
      
      window.location.reload();
      
    }


  }





}
