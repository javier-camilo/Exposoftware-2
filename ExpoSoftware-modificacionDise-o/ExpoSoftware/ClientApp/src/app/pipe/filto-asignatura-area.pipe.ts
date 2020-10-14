import { Pipe, PipeTransform } from '@angular/core';
import { Asignatura } from '../comite/asignatura/models/asignatura';

@Pipe({
  name: 'filtoAsignaturaArea'
})
export class FiltoAsignaturaAreaPipe implements PipeTransform {

  transform(asignaturas:Asignatura[], searchText:string): Asignatura[] {

    if(searchText==null)return asignaturas;


    return asignaturas.filter(p =>

     p.areaAsignatura.toLowerCase() === searchText.toLowerCase()

    );

    
  }

}
