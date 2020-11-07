import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/comite/area/model/area';
import { AspectoEvaluar } from 'src/app/comite/gestion-preguntas/models/aspecto-evaluar';
import { Rubrica } from 'src/app/comite/rubrica/models/rubrica';
import { ProyectoEvaluado } from 'src/app/docenteEvaluador/model/proyecto-evaluado';
import { ApestoEvaluarService } from 'src/app/services/apesto-evaluar.service';
import { AreaService } from 'src/app/services/area.service';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ProyectoEvaluadoService } from 'src/app/services/proyecto-evaluado.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RubricaService } from 'src/app/services/rubrica.service';
import { Proyecto } from '../proyecto/models/proyecto';

@Component({
  selector: 'app-consultar-evaluacion',
  templateUrl: './consultar-evaluacion.component.html',
  styleUrls: ['./consultar-evaluacion.component.css']
})
export class ConsultarEvaluacionComponent implements OnInit {

  idPoryecto:string;
  codArea:string;
  proyecto:Proyecto;
  area:Area;
  rubrica:Rubrica;
  preguntas:AspectoEvaluar[]=[];
  pregunta:AspectoEvaluar;
  proyectoEvaluadoList:ProyectoEvaluado[]=[];
  proyectoEvaluado:ProyectoEvaluado;

  
  constructor(private rutaActiva: ActivatedRoute, private proyectoService:ProyectoService, private areaService:AreaService,
    private rubricaService:RubricaService, private aspectoEvaluarService:ApestoEvaluarService, 
    private proyectoEvaluadoService:ProyectoEvaluadoService,private dialog:MatDialog, private asgnaturaService:AsignaturaService) { }
  

  ngOnInit(): void {


    this.idPoryecto = this.rutaActiva.snapshot.params.refProyecto;

    this.proyecto=new Proyecto();
    this.area= new Area();
    this.rubrica=new Rubrica();
    this.proyectoEvaluado=new ProyectoEvaluado();
    this.pregunta=new AspectoEvaluar();

    this.inicializar();

  }

  inicializar(){

  

    this.proyectoEvaluadoService.getId(this.idPoryecto).subscribe(result=>{

      this.proyectoEvaluadoList=result;

      this.proyectoEvaluadoList.forEach(element => {

        this.pregunta=new AspectoEvaluar();
        this.pregunta.pregunta=element.pregunta;
        this.pregunta.valor=element.valor;

        this.preguntas.push(this.pregunta);

      });

      this.proyectoService.getId(this.idPoryecto).subscribe(result=>{

        this.proyecto=result;

          this.asgnaturaService.getId(this.proyecto.codigoAsignatura," ").subscribe(result=>{

            if(result!=null){

              this.areaService.getId(result.areaAsignatura," ").subscribe(result=>{

                this.area=result;

              });
            }
            
          });
        }
      );
  

    });

    
  }



}
