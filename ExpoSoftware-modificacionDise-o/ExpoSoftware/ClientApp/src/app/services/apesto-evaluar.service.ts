import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { AspectoEvaluar } from '../comite/gestion-preguntas/models/aspecto-evaluar';
import { tap, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApestoEvaluarService {

  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) { 
      
      this.baseUrl = baseUrl;
      
    }


        
    get(operacion:string): Observable<AspectoEvaluar[]> {
      return this.http.get<AspectoEvaluar[]>(this.baseUrl + 'api/AspectoEvaluar')
          .pipe(
              tap(_ => 
               

                {

                if(operacion==="AspectoEvaluar")
                this.handleErrorService.log('Datos de la preguntas recibido');

                }
               
            ),
              catchError(this.handleErrorService.handleError<AspectoEvaluar[]>('Consulta Preguntas', null))
          );
    }


    public TraerPreguntas(filtroString:string,mostrar?:string):Observable<AspectoEvaluar[]>{

      const url = `${this.baseUrl + 'api/AspectoEvaluar/getPreguntas'}/${filtroString}`;
      return this.http.get<AspectoEvaluar[]>(url,httpOptions)
      .pipe(
        tap(_ =>  
          {
              if (mostrar!=null) {
                
                this.handleErrorService.log('Datos de las Preguntas recibidas');
              } 

          }
          
          ),
        catchError(this.handleErrorService.handleError<AspectoEvaluar[]>('Consulta Preguntas', null))
      );
  
    }


    delete(aspectoEvaluar: AspectoEvaluar| number): Observable<string> {
      const id = aspectoEvaluar;
      return this.http.delete(this.baseUrl + 'api/AspectoEvaluar/'+ id, {responseType: 'text'} )
      .pipe(
        tap(_ => this.handleErrorService.log("se elimino de manera correcta la pregunta")),
        catchError(this.handleErrorService.handleError<string>('Elimiar Asignatura', null))
      );
    }

    
    post(pregunta:AspectoEvaluar,mostrar?:string): Observable<AspectoEvaluar> {
      return this.http.post<AspectoEvaluar>(this.baseUrl + 'api/AspectoEvaluar', pregunta)
          .pipe(
              tap(_ => 

                {
                  if(mostrar!=null){
                    this.handleErrorService.log("se agrego la pregunta")
                  }
                  
                }
                
                ),
              catchError(this.handleErrorService.handleError<AspectoEvaluar>('Registrar area', null))
          );
        
    }



  


}
