import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/comite/area/model/area';
import { Proyecto } from 'src/app/docenteAsesor/proyecto/models/proyecto';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyectos-busqueda',
  templateUrl: './proyectos-busqueda.component.html',
  styleUrls: ['./proyectos-busqueda.component.css']
})
export class ProyectosBusquedaComponent implements OnInit {
  

  areas:Area[];
  proyectos:Proyecto[];
  dataSource:any;
  idRubrica:string;
  idArea:string;

  displayedColumns: string[] = ['idProyecto', 'titulo', 'resumen','metodologia'];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private areasService: AreaService, private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    this.inicarAreas();
    this.cargarTabla();
  }

  inicarAreas(){
    this.areasService.get("").subscribe(result=>this.areas=result);
  }

  cargarTabla(){

    this.dataSource = new MatTableDataSource<Proyecto>(this.proyectos);
    this.dataSource.paginator = this.paginator;

  }

  cargar(){

    this.proyectoService.ProyectosPorArea(this.idArea).subscribe(result=>
      {

        
      this.proyectos=result
      this.dataSource = new MatTableDataSource<Proyecto>(this.proyectos);
      this.dataSource.paginator = this.paginator;

      }
      
      );

  }



}
