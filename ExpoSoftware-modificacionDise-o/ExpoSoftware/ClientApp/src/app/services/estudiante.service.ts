import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Area } from '../comite/area/model/area';
import { Estudiante } from '../docenteAsesor/proyecto/models/estudiante';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  baseUrl: string;

  constructor( private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
     }


    post(estudiante:Estudiante): Observable<Estudiante> {
      return this.http.post<Estudiante>(this.baseUrl + 'api/Estudiantes', estudiante)
          .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Estudiante>('Registrar estudiante', null))
          );
    }

    get(operacion:string): Observable<Estudiante[]> {
      return this.http.get<Estudiante[]>(this.baseUrl + 'api/Estudiantes')
      .pipe(
        tap(_ => {
          if(operacion ==="estudianteComponent")
          this.handleErrorService.log('Datos del estudiante recibidos');
        }

        ),
        catchError(this.handleErrorService.handleError<Estudiante[]>('Consulta estudiante', null))
      );
    }

    getId(id: string, operacionLlamado?:string): Observable<Estudiante> {
      const url = `${this.baseUrl + 'api/Estudiantes'}/${id}`;
      return this.http.get<Estudiante>(url, httpOptions)
      .pipe(
        tap(_ => {
          if(operacionLlamado==null){
            this.handleErrorService.log('se consulto el estudiante con identificacion: '+ id )
          }
        }

        ),
        catchError(this.handleErrorService.handleError<Estudiante>('Buscar estudiante', null))
      );
    }


    put(estudiante: Estudiante): Observable<any> {
      const url = `${this.baseUrl}api/Estudiante/${estudiante.identificacion}`;
      return this.http.put(url, estudiante,  {responseType: 'text'} )
      .pipe(
        tap(_=> this.handleErrorService.log(_)),
        catchError(this.handleErrorService.handleError<any>('Editar estudiante'))
      );
    }


    delete(estudiante: Estudiante | string): Observable<string> {
      const id = typeof estudiante === 'string' ? estudiante : estudiante.identificacion;
      return this.http.delete(this.baseUrl + 'api/Estudiante'+ id, {responseType: 'text'} )
      .pipe(
        tap(_ => this.handleErrorService.log(_)),
        catchError(this.handleErrorService.handleError<string>('Elimiar estudiante', null))
      );
    }



}
