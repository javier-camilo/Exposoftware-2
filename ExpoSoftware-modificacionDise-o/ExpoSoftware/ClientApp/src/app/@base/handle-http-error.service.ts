import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CuadroDialogoComponent } from '../cuadro-dialogo/cuadro-dialogo.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})


export class HandleHttpErrorService {

  
  
  constructor(private dialog:MatDialog) { }
  
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

     if (error.status == '500') {
        this.mostrarError500(error);
     }
     if (error.status == '400') {
       this.mostrarError400(error);
     }

      return of(result as T);
    };
  }


  public log(message: string) {
    this.dialog.open(CuadroDialogoComponent, {data: {name:"Señor Usuario", descripcion: message, EsMensaje: "true"}});
  }


  private mostrarError500(error: any) {
    console.error(error);
  }


  private mostrarError400(error: any): void {
  
    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

   let dialogo= this.dialog.open(CuadroDialogoComponent, {data: {name:"Mensaje de Error", descripcion: mensajeValidaciones, EsMensaje: "true"}, width:"600px"});
  
  }

  

}
