import { Component, OnInit, ViewChild } from '@angular/core';
import { Proyecto } from '../proyecto/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-consulta-solicitudes',
  templateUrl: './consulta-solicitudes.component.html',
  styleUrls: ['./consulta-solicitudes.component.css']
})
export class ConsultaSolicitudesComponent implements OnInit {

  proyectos:Proyecto[]=[];
  dataSource:any;
  FiltroDocente:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.FiltroDocente="";
  }

  getProyectos(){

    this.proyectoService.TraerProyectos(this.FiltroDocente).subscribe(result=>{

      this.proyectos=result;

      this.dataSource = new MatTableDataSource<Proyecto>(this.proyectos);
      this.dataSource.paginator = this.paginator;
    
    });

  }

  displayedColumns: string[] = ['Referencia', 'Titulo', 'Resumen', 'Estado', 'Pendon'];


  comprobar(comprobar:string):boolean{
    if(comprobar==="Aprobado"){
      return true;
    }else{
      return false;
    }

  }


}
