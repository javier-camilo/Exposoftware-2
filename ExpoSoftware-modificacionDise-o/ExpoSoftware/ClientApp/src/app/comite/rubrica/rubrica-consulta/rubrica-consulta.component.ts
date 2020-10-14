import { Component, OnInit, ViewChild } from '@angular/core';
import { Rubrica } from '../models/rubrica';
import { Area } from '../../area/model/area';
import { RubricaService } from 'src/app/services/rubrica.service';
import { AreaService } from 'src/app/services/area.service';
import {MatTableDataSource, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';

@Component({
  selector: 'app-rubrica-consulta',
  templateUrl: './rubrica-consulta.component.html',
  styleUrls: ['./rubrica-consulta.component.css']
})
export class RubricaConsultaComponent implements OnInit {

  FiltroRubrica:string;
  areas:Area[];
  rubricas:Rubrica[]=[];
  dataSource:any;
  displayedColumns: string[] = ['Referencia', 'Titulo', 'IdArea','Area', 'Preguntas','Eliminar'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  
  constructor(private areaService:AreaService,private rubricaService:RubricaService,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.cargarAreas();
    this.cargarRubrica();

    
  }


   cargarRubrica(){
     
     this.rubricaService.get("").subscribe(result=>{this.rubricas=result;

      this.dataSource = new MatTableDataSource<Rubrica>(this.rubricas);
      this.dataSource.paginator = this.paginator;


      this.dataSource.filterPredicate = (data: Rubrica, filter: string) => {

    
        return data.codigoArea.toLowerCase()
        .indexOf(filter.toLowerCase()) !== -1  ||

        data.titulo.toLowerCase()
        .indexOf(filter.toLowerCase()) !== -1 ||

        data.idRubrica.toLowerCase()
        .indexOf(filter.toLowerCase()) !== -1;


       };

    
    });
  }


   cargarAreas(){
     this.areaService.get("").subscribe(result=>this.areas=result);
  }


  buscarArea(areaBuscada:string):string{

    this.areas.forEach(element => {

      if (element.codigoArea==areaBuscada) {

        return element.nombreArea;

      }

    });

    return " ";
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    this.dataSource.filter = filterValue;
  }

  borrar(ref:string){
       
  let dialogo= this.dialog.open(CuadroDialogoComponent, {data:{name:"Advertencia", descripcion:"<div><center>¿ esta seguro de realizar esta accion?</center></div> <br> se borrara permanentemente la rubrica y sus preguntas asociadas"} } );

  dialogo.afterClosed().subscribe(result => {
    

      if (result=="true") {

        this.rubricaService.delete(ref).subscribe();
        this.rubricaService.get().subscribe(result=>this.rubricas=result);

      } 


    }

  );

  }


}
