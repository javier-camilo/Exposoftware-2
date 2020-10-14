import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DocenteService } from 'src/app/services/docente.service';
import { Docente } from 'src/app/comite/docente/models/docente';
import { Estudiante } from '../models/estudiante';
import { CuadroDialogoComponent } from 'src/app/cuadro-dialogo/cuadro-dialogo.component';
import { MatDialog } from '@angular/material';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/comite/asignatura/models/asignatura';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyecto-registro',
  templateUrl: './proyecto-registro.component.html',
  styleUrls: ['./proyecto-registro.component.css']
})
export class ProyectoRegistroComponent implements OnInit {

  isLinear = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  treeFormgroup:FormGroup;
  busquedaDocente:string;
  
  proyecto:Proyecto;
  estudiante:Estudiante;
  docente:Docente;
  asignaturas:Asignatura[];
  
  busquedaEstudiante:string;



  constructor(private _formBuilder: FormBuilder, private docenteService:DocenteService,private dialog:MatDialog,
    private asignaturaSerice:AsignaturaService,private estudianteService:EstudianteService, private proyectoService:ProyectoService) {}

  ngOnInit() {
    
    this.docente=new Docente();
    this.estudiante=new Estudiante();
    this.proyecto=new Proyecto();

    this.iniciarDocente();
    this.iniciarAAsignatura();
    this.iniciarEstudiante();

    this.buildForm();
    this.buildFromDos();
    this.buildFromTres();

  }


  iniciarDocente(){
       
    this.docente.identificacion="";
    
    this.docente.nombre="";

    this.docente.asignaturas="";

    this.docente.descripcion="";

  }

  iniciarEstudiante(){
    
    this.estudiante.identificacion="";
    this.estudiante.nombre="";
    this.estudiante.correo="";
    this.estudiante.celular="";
    this.estudiante.asignatura="";
    this.estudiante.semestre=0;

  }

  iniciarProyecto(){
    this.proyecto.idProyecto="";
    this.proyecto.titulo="";
    this.proyecto.metodologia="";
    this.proyecto.resumen="";
  }

  iniciarAAsignatura(){

    this.asignaturaSerice.get("").subscribe(result=>this.asignaturas=result);

  }

  buscarDocente(){


    this.docenteService.getId(this.busquedaDocente).subscribe(result  => { this.docente=result; 

      if(this.docente==null){
        
         this.resultado("Consultar","No se encuentra registrado el docente");

      }

      this.buildForm(); 
    
    
    });
  
  }



  buscarEstudiante(){

    this.estudianteService.getId(this.busquedaEstudiante).subscribe(result  => { this.estudiante=result; 

      if(this.estudiante==null){
        
         this.resultado("Consultar","No se encuentra registrado el estuidante");

      }

      this.buildFromDos();
      
    });

  }


  private buildForm(){


    this.firstFormGroup= this._formBuilder.group({


          identificacion: [this.docente.identificacion, Validators.required],
          nombre: [this.docente.nombre, Validators.required],
          asignaturas: [this.docente.asignaturas,Validators.required],
          descripcion: [this.docente.descripcion,Validators.required]

          });


    }

   

    private buildFromDos(){


      this.secondFormGroup = this._formBuilder.group({


        identificacion: [this.estudiante.identificacion, [Validators.required, Validators.maxLength(10)]],
        nombre: [this.estudiante.nombre, Validators.required],
        correo: [this.estudiante.correo,Validators.required],
        celular: [this.estudiante.celular,Validators.required],
        asignatura:[this.estudiante.asignatura,Validators.required],
        semestre:[this.estudiante.semestre,Validators.required]


        });


    }


    private  buildFromTres(){


      this.treeFormgroup = this._formBuilder.group({


        idProyecto: [this.proyecto.idProyecto, [Validators.required, Validators.maxLength(2)]],
        titulo: [this.proyecto.titulo, Validators.required],
        metodologia: [this.proyecto.metodologia,Validators.required],
        resumen: [this.proyecto.resumen,Validators.required]


        });
      
    }



    onSubmit() {
        if (this.firstFormGroup.invalid) {
            return;
           }
        this.add();
     }


    add(){


        this.docente=this.firstFormGroup.value;
        this.docente.tipo="asesor";
        this.docenteService.post(this.docente).subscribe(result=>this.docente=result);


        this.estudiante=this.secondFormGroup.value;
        this.estudianteService.post(this.estudiante).subscribe(result=>this.estudiante=result);

        this.proyecto=this.treeFormgroup.value;
        this.proyecto.identificacionDocente=this.docente.identificacion;
        this.proyecto.identificacionEstudiante=this.estudiante.identificacion;
        this.proyecto.estado="sin revisar";
        this.proyecto.codigoAsignatura=this.estudiante.asignatura;
        this.proyectoService.post(this.proyecto).subscribe();

    }


    resultado(operacion:string, mensaje:string){

      this.dialog.open(CuadroDialogoComponent, {data: {name:operacion, descripcion: mensaje, EsMensaje: "true"}});
      
    }




}
