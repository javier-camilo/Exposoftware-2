import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AspectoEvaluar } from './models/aspecto-evaluar';
import { ApestoEvaluarService } from 'src/app/services/apesto-evaluar.service';
import { MatDialog } from '@angular/material';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignalRService } from 'src/app/services/signal-rng.service';
import { element } from 'protractor';

@Component({
  selector: 'app-gestion-preguntas',
  templateUrl: './gestion-preguntas.component.html',
  styleUrls: ['./gestion-preguntas.component.css']
})
export class GestionPreguntasComponent implements OnInit {

  preguntas:AspectoEvaluar[];
  preguntaForm: FormGroup;
  pregunta:AspectoEvaluar;
  id:any;
  rubrica:string;

  
  constructor(private rutaActiva: ActivatedRoute,private aspectoEvaluarService:ApestoEvaluarService,private dialog:MatDialog,
    private formBuilder: FormBuilder,private signalRService: SignalRService) { }

  ngOnInit(): void {

    this.pregunta=new AspectoEvaluar();
    const id = this.rutaActiva.snapshot.params.codigoRubrica;
    this.rubrica=id;
    this.inicar(id);
    this.buildForm();

    this.signalRService.signalReceived.subscribe((aspectoEvaluar: AspectoEvaluar) => {
      this.preguntas.push(aspectoEvaluar);
    });

    
    this.signalRService.signalReceivedDos.subscribe((aspectoEvaluar: AspectoEvaluar) => {
      this.aspectoEvaluarService.TraerPreguntas(aspectoEvaluar.refRubrica).subscribe(result=>{this.preguntas=result;});

    });

  }

  
  private buildForm(){

    this.preguntaForm = this.formBuilder.group({
      pregunta : [this.pregunta.pregunta, Validators.required]
    });

  }

  inicar(filtroPreguntas:string){

    this.aspectoEvaluarService.TraerPreguntas(filtroPreguntas).subscribe(result=>{this.preguntas=result; console.log(this.preguntas)});

  }

  eliminar(ref:number){

     
  let dialogo= this.dialog.open(CuadroDialogoComponent, {data:{name:"Advertencia", descripcion:"¿ esta seguro de realizar esta accion?"} } );

  dialogo.afterClosed().subscribe(result => {
    

      if (result=="true") {

          this.aspectoEvaluarService.delete(ref).subscribe();

      } 


    }

  );

  }



  

  add(){

    this.pregunta=this.preguntaForm.value;
    this.pregunta.refRubrica=this.rubrica;
    this.aspectoEvaluarService.post(this.pregunta,"mostrar").subscribe();

  }



}


