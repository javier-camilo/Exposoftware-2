import { Pipe, PipeTransform } from '@angular/core';
import { Asignatura } from '../comite/asignatura/models/asignatura';

@Pipe({
  name: 'filtroAsignatura'
})
export class FiltroAsignaturaPipe implements PipeTransform {


  transform(asignaturas:Asignatura[], searchText:string): Asignatura[] {

    if(searchText==null)return asignaturas;

    return asignaturas.filter(p =>

      p.codigoAsignatura.toLowerCase()
     .indexOf(searchText.toLowerCase()) !== -1 ||

     p.nombreAsignatura.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1  

    );

    
  }


}
