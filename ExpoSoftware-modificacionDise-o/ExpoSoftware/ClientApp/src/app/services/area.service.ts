import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Area } from '../comite/area/model/area';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  
  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) { 
      
      this.baseUrl = baseUrl;
      
    }


    post(area:Area): Observable<Area> {
      return this.http.post<Area>(this.baseUrl + 'api/Area', area)
          .pipe(
              tap(_ => this.handleErrorService.log('Guardado con exito')),
              catchError(this.handleErrorService.handleError<Area>('Registrar area', null))
          );
        
    }


    
    get(operacion:string): Observable<Area[]> {
      return this.http.get<Area[]>(this.baseUrl + 'api/Area')
          .pipe(
              tap(_ => 
               

                {

                if(operacion==="areaComponent")
                this.handleErrorService.log('Datos de la areas recibido');

                }
               
            ),
              catchError(this.handleErrorService.handleError<Area[]>('Consulta area', null))
          );
    }


    
    getId(id: string, operacionLLamado?:string): Observable<Area> {
      const url = `${this.baseUrl + 'api/Area'}/${id}`;
        return this.http.get<Area>(url, httpOptions)
        .pipe(
          tap(_ =>

            {
              
                if(operacionLLamado==null){
                  
                    this.handleErrorService.log('se consulto la area con codigo = '+ id)

                }
                
            }
            
            ),
          catchError(this.handleErrorService.handleError<Area>('Buscar Asignatura', null))
        );
    }


    put(area: Area): Observable<any> {
      const url = `${this.baseUrl}api/Area/${area.codigoArea}`;
      return this.http.put(url, area,  {responseType: 'text'} )
      .pipe(
        tap(_=> this.handleErrorService.log(_)),
        catchError(this.handleErrorService.handleError<any>('Editar area'))
      );
    }


    delete(area: Area| string): Observable<string> {
      const id = typeof area === 'string' ? area : area.codigoArea;
      return this.http.delete(this.baseUrl + 'api/Area/'+ id, {responseType: 'text'} )
      .pipe(
        tap(_ => this.handleErrorService.log(_)),
        catchError(this.handleErrorService.handleError<string>('Elimiar Asignatura', null))
      );
    }


}
