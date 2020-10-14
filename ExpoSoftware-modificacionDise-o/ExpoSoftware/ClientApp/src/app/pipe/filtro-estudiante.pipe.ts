import { Pipe, PipeTransform } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../comite/estudiante/models/estudiante';

@Pipe({
  name: 'filtroEstudiante'
})
export class FiltroEstudiantePipe implements PipeTransform {

  transform(estudiantes : Estudiante[], searchText:string): Estudiante[] {
    if(searchText==null)return estudiantes;

    return estudiantes.filter(p => 
      p.identificacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      ||
      p.identificacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    
  }

}
