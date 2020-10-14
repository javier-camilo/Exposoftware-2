import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Rubrica } from '../comite/rubrica/models/rubrica';
import { tap, catchError } from 'rxjs/operators';
import { Estudiante } from '../docenteAsesor/proyecto/models/estudiante';
import { Observable } from 'rxjs';



const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RubricaService {

  
  baseUrl: string;

  constructor( private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl = baseUrl;
  }


  post(rubrica: Rubrica,mostrar?:string): Observable<Rubrica> {
    return this.http.post<Rubrica>(this.baseUrl + 'api/Rubrica', rubrica)
      .pipe(
        tap(_ => 
          
          {
            if(mostrar!=null){

               this.handleErrorService.log('Guardado con exito La Rubrica')
               
            }
          }
        
        ),
        catchError(this.handleErrorService.handleError<Rubrica>('Registrar Rubrica', null))
      );
  }


  get(llamadado?:string): Observable<Rubrica[]> {
    return this.http.get<Rubrica[]>(this.baseUrl + 'api/Rubrica')
      .pipe(
        tap(_ => 
          {
            
            if(llamadado!=null){
                  
                  this.handleErrorService.log('Datos De las rubricas recibidos')
            }

          }
          ),
        catchError(this.handleErrorService.handleError<Rubrica[]>('Consulta Rubrica', null))
      );
  }


  delete(rubrica:string): Observable<string> {
    const id = rubrica;
    return this.http.delete(this.baseUrl + 'api/Rubrica/'+ id, {responseType: 'text'} )
    .pipe(
      tap(_ => this.handleErrorService.log("se borro satisfactoriamente")),
      catchError(this.handleErrorService.handleError<string>('Elimiar estudiante', null))
    );
  }


}
