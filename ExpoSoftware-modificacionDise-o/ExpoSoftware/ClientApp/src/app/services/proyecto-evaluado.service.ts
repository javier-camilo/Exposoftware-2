import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { ProyectoEvaluado } from '../docenteEvaluador/model/proyecto-evaluado';
import { tap, catchError } from 'rxjs/operators';

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

export class ProyectoEvaluadoService {

  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {

      this.baseUrl = baseUrl;

     }
     
     
      post(proyectoEvaluado:ProyectoEvaluado[]): Observable<ProyectoEvaluado> {
        return this.http.post<ProyectoEvaluado>(this.baseUrl + 'api/ProyectoEvaluado/PosPreguntas', proyectoEvaluado)
            .pipe(
              tap( _ => this.handleErrorService.log("registro con exito")),
              catchError(this.handleErrorService.handleError<ProyectoEvaluado>('Registrar estudiante', null))
            );
      }


      getId(id: string): Observable<ProyectoEvaluado[]> {
        const url = `${this.baseUrl + 'api/ProyectoEvaluado/GetEvaluacionFiltros'}/${id}`;
        return this.http.get<ProyectoEvaluado[]>(url, httpOptions)
          .pipe(
            tap(_ => this.handleErrorService.log('se consulto el proyecto con identificacion = ' + id)),
            catchError(this.handleErrorService.handleError<ProyectoEvaluado[]>('Buscar Proyecto', null))
          );
      }
    
    
    

      

}
