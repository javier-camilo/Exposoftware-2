import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { DocenteService } from 'src/app/services/docente.service';
import { AreaService } from 'src/app/services/area.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/comite/asignatura/models/asignatura';
import { Docente } from 'src/app/comite/docente/models/docente';

@Component({
  selector: 'app-proyecto-consulta',
  templateUrl: './proyecto-consulta.component.html',
  styleUrls: ['./proyecto-consulta.component.css']
})

export class ProyectoConsultaComponent implements OnInit {

  isLinear:boolean;
  proyectos:Proyecto[];
  asignatura:Asignatura;
  docente:Docente;

  proyecto:Proyecto;

  constructor(private proyectoService:ProyectoService, private docenteService:DocenteService, private areaService:AreaService
    ,private asignaturaService:AsignaturaService
    ) { }

  ngOnInit(): void {

    this.docente=new Docente();
    this.proyecto=new Proyecto();
    this.asignatura=new Asignatura();
    this.isLinear=true;
    this.inicializar();

  }

  inicializar(){
    this.proyectoService.get().subscribe(result => {this.proyectos=result});
  }

  consultar(id:string){

    this.proyectoService.getId(id).subscribe(result=>
      
      {
        

        this.proyecto=result;

        this.asignaturaService.getId(this.proyecto.codigoAsignatura," ").subscribe(result  => this.asignatura=result);

        this.docenteService.getId(this.proyecto.identificacionDocente, " ").subscribe(result  => this.docente=result);


      }
      
      
      );


  }

  modificarEstado(){

    this.proyectoService.put(this.proyecto).subscribe( result => {

      
    this.ngOnInit();

    }

      


    );


  }


}
