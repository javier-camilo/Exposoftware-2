import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from '../models/asignatura';
import { AreaService } from 'src/app/services/area.service';
import { Area } from '../../area/model/area';

@Component({
  selector: 'app-asignatura-consulta',
  templateUrl: './asignatura-consulta.component.html',
  styleUrls: ['./asignatura-consulta.component.css']
})
export class AsignaturaConsultaComponent implements OnInit {

  searchText:string;
  asignaturas:Asignatura[];
  asignatura:Asignatura;
  areas:Area[];

  constructor(private asignaturaService:AsignaturaService, private areaService:AreaService) { }


  ngOnInit() {

    this.searchText="";
    this.asignaturaService.get("asignatura").subscribe(result => {
      this.asignaturas = result;
    });

    this.areaService.get("").subscribe(result => {this.areas=result});

  }



}
