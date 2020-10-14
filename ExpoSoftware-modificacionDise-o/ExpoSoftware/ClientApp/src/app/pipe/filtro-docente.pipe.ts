import { Pipe, PipeTransform } from '@angular/core';
import { Docente } from '../comite/docente/models/docente';
import { Asignatura } from '../comite/asignatura/models/asignatura';

@Pipe({
  name: 'filtroDocente'
})
export class FiltroDocentePipe implements PipeTransform {

  transform(docentes:Docente[], searchText: string): Docente[] {
    if(searchText==null) return docentes;

    return docentes.filter(p =>
       p.identificacion.toLowerCase()
       .indexOf(searchText.toLowerCase()) !== -1 

      || 

      p.nombre.toLowerCase()
      .indexOf(searchText.toLowerCase()) !== -1 
       ) 

  }

}
