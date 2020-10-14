import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Docente } from '../comite/docente/models/docente';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';


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

export class DocenteService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
  {
    this.baseUrl = baseUrl;
  }

  post(docente: Docente,mostrar?:string): Observable<Docente> {
    return this.http.post<Docente>(this.baseUrl + 'api/Docente', docente)
      .pipe(
        tap(_ => 

          {

            if(mostrar!=null){

                this.handleErrorService.log('Guardado con exito gg')
                

            }

          }
          
          ),
        catchError(this.handleErrorService.handleError<Docente>('Registrar Docente', null))
      );
  }

  get(llamadado?:string): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl + 'api/Docente')
      .pipe(
        tap(_ => 

          {
            
            if(llamadado!=null){
                  
                  this.handleErrorService.log('Datos del docente recibidos')
            }

          }
          
          ),
        catchError(this.handleErrorService.handleError<Docente[]>('Consulta Asignatura', null))
      );
  }

  getId(id: string, llamadoOperacion?:string): Observable<Docente> {
    const url = `${this.baseUrl + 'api/Docente'}/${id}`;
    return this.http.get<Docente>(url, httpOptions)
      .pipe(
        tap(_ => 

          {

            if(llamadoOperacion==null){
              
              this.handleErrorService.log('se consulto el docente con identificacion = ' + id)

            }

          }
          
          ),
        catchError(this.handleErrorService.handleError<Docente>('Buscar docente', null))
      );
  }

  delete(docente: Docente | string): Observable<string> {
    const id = typeof docente === 'string' ? docente : docente.identificacion;
    return this.http.delete(this.baseUrl + 'api/Docente/' + id, { responseType: 'text' })
      .pipe(
        tap(_ => this.handleErrorService.log('se borro satisfactoriamente')),
        catchError(this.handleErrorService.handleError<string>('Elimiar Docente', null))
      );
  }


  put(docente: Docente): Observable<any> {
    const url = `${this.baseUrl}api/Docente/${docente.identificacion}`;
    return this.http.put(url, docente, { responseType: 'text' })
      .pipe(
        tap(_ => this.handleErrorService.log('se modifico satisfactoriamente')),
        catchError(this.handleErrorService.handleError<any>('Editar Docente'))
      );
  }


}
