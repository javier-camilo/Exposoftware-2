import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Proyecto } from '../docenteAsesor/proyecto/models/proyecto';

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
export class ProyectoService {

  
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
  {
    this.baseUrl = baseUrl;
  }


  post(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.baseUrl + 'api/Proyecto', proyecto)
      .pipe(
        tap(_ => this.handleErrorService.log('Guardado con exito')),
        catchError(this.handleErrorService.handleError<Proyecto>('Registrar Proyecto', null))
      );
  }

  get(mostrar?:string): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.baseUrl + 'api/Proyecto')
      .pipe(
        tap(_ => 

          {
              if(mostrar!=null){
                this.handleErrorService.log('Datos de las solicitudes recibidas')
              }
          }
          
          ),
        catchError(this.handleErrorService.handleError<Proyecto[]>('Consulta Proyecto', null))
      );
  }



 

  getId(id: string): Observable<Proyecto> {
    const url = `${this.baseUrl + 'api/Proyecto'}/${id}`;
    return this.http.get<Proyecto>(url, httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.log('se consulto el proyecto con identificacion = ' + id)),
        catchError(this.handleErrorService.handleError<Proyecto>('Buscar Proyecto', null))
      );
  }

  put(proyecto: Proyecto): Observable<any> {
    const url = `${this.baseUrl}api/Proyecto/${proyecto.idProyecto}`;
    return this.http.put(url, proyecto, { responseType: 'text' })
      .pipe(
        tap(_ => this.handleErrorService.log(_)),
        catchError(this.handleErrorService.handleError<any>('Editar Estado'))
      );
  }


  public TraerProyectos(filtroString:string):Observable<Proyecto[]>{

    const url = `${this.baseUrl + 'api/Proyecto/GetProyectosFiltros'}/${filtroString}`;
    return this.http.get<Proyecto[]>(url,httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.log('Datos de las solicitudes recibidas')),
      catchError(this.handleErrorService.handleError<Proyecto[]>('Consulta Proyecto', null))
    );


  }

  public ProyectosPorArea(filtroString:string, mostrar?:string):Observable<Proyecto[]>{

    const url = `${this.baseUrl + 'api/Proyecto/GetProyectosArea'}/${filtroString}`;
    return this.http.get<Proyecto[]>(url,httpOptions)
    .pipe(
      tap(_ =>
          {
            if (mostrar!=null) {
              this.handleErrorService.log('Proyecto a evaluar recibidos')
            }
          }
        ),
      catchError(this.handleErrorService.handleError<Proyecto[]>('Consulta Proyecto', null))
    );
  }



}
