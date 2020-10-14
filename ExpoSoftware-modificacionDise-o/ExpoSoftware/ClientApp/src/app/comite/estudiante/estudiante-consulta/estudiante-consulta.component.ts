import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Area } from '../../area/model/area';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { AreaService } from 'src/app/services/area.service';
import { Asignatura } from '../../asignatura/models/asignatura';
import { AsignaturaService } from 'src/app/services/asignatura.service';
@Component({
  selector: 'app-estudiante-consulta',
  templateUrl: './estudiante-consulta.component.html',
  styleUrls: ['./estudiante-consulta.component.css']
})
export class EstudianteConsultaComponent implements OnInit {
  searchText : string;
  estudiantes:Estudiante[];
  estudiante:Estudiante;
  asignaturas: Asignatura[];




  constructor(private estudianteService : EstudianteService, private asignaturaService: AsignaturaService) { }

  ngOnInit(){
    this.searchText="";
    this.estudianteService.get("estudiante").subscribe(result => {
      this.estudiantes = result;
    });

    this.asignaturaService.get("").subscribe(result => {this.asignaturas=result});
  }

}
