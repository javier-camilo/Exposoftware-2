import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/comite/area/model/area';
import { AspectoEvaluar } from 'src/app/comite/gestion-preguntas/models/aspecto-evaluar';
import { Rubrica } from 'src/app/comite/rubrica/models/rubrica';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { Proyecto } from 'src/app/docenteAsesor/proyecto/models/proyecto';
import { ApestoEvaluarService } from 'src/app/services/apesto-evaluar.service';
import { AreaService } from 'src/app/services/area.service';
import { ProyectoEvaluadoService } from 'src/app/services/proyecto-evaluado.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RubricaService } from 'src/app/services/rubrica.service';
import { ProyectoEvaluado } from '../model/proyecto-evaluado';

@Component({
  selector: 'app-registrar-evaluacion',
  templateUrl: './registrar-evaluacion.component.html',
  styleUrls: ['./registrar-evaluacion.component.css']
})
export class RegistrarEvaluacionComponent implements OnInit {

 
  idPoryecto:string;
  codArea:string;
  proyecto:Proyecto;
  area:Area;
  rubrica:Rubrica;
  preguntas:AspectoEvaluar[];
  proyectoEvaluadoList:ProyectoEvaluado[]=[];
  proyectoEvaluado:ProyectoEvaluado;
  


  constructor(private rutaActiva: ActivatedRoute, private proyectoService:ProyectoService, private areaService:AreaService,
    private rubricaService:RubricaService, private aspectoEvaluarService:ApestoEvaluarService, 
    private proyectoEvaluadoService:ProyectoEvaluadoService,private dialog:MatDialog) { }
  

  ngOnInit(): void {


    this.idPoryecto = this.rutaActiva.snapshot.params.refProyecto;
    this.codArea = this.rutaActiva.snapshot.params.codigoArea;

    this.proyecto=new Proyecto();
    this.area= new Area();
    this.rubrica=new Rubrica();
    this.proyectoEvaluado=new ProyectoEvaluado();

    this.inicializar();

  }

  inicializar(){

    this.proyectoService.getId(this.idPoryecto).subscribe(result=>{
      this.proyecto=result;
      }
    );


    this.areaService.getId(this.codArea," ").subscribe(result=>{
       
      this.area=result;

      if(this.area!=null){

          this.rubricaService.getId(this.codArea," ").subscribe(result=>
            {
              
              this.rubrica=result;
              this.aspectoEvaluarService.TraerPreguntas(this.rubrica.idRubrica).subscribe(result=>this.preguntas=result);
          
            }
            
        );
        }

    });

  }

  

  registrarPreguntas(){

    this.preguntas.forEach(element => {
      
      this.proyectoEvaluado=new ProyectoEvaluado();
      this.proyectoEvaluado.idProyecto=this.idPoryecto;
      this.proyectoEvaluado.refRubrica=this.rubrica.idRubrica;
      this.proyectoEvaluado.pregunta=element.pregunta;
      this.proyectoEvaluado.valor=element.valor;

      this.proyectoEvaluadoList.push(this.proyectoEvaluado);


    });

    this.proyectoEvaluadoService.post(this.proyectoEvaluadoList).subscribe( result =>
      {
          this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: "se registro con exito", EsMensaje: "true"}});
      }
      
      );
    
  }



}
