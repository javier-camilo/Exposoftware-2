import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar-evaluacion',
  templateUrl: './registrar-evaluacion.component.html',
  styleUrls: ['./registrar-evaluacion.component.css']
})
export class RegistrarEvaluacionComponent implements OnInit {

 
  idPoryecto:string;
  codArea:string;

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {


    this.idPoryecto = this.rutaActiva.snapshot.params.refProyecto;

    this.codArea = this.rutaActiva.snapshot.params.codigoArea;


  }

}
