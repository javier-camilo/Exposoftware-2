import { Pipe, PipeTransform } from '@angular/core';
import { Rubrica } from '../comite/rubrica/models/rubrica';

@Pipe({
  name: 'filtroRubrica'
})
export class FiltroRubricaPipe implements PipeTransform {

  transform(rubricas:Rubrica[] , searchText:string): Rubrica[]  {
      if(searchText==null) return rubricas;

    return rubricas.filter(p =>

       p.codigoArea.toLowerCase()
       .indexOf(searchText.toLowerCase()) !== -1 

      || 

      p.titulo.toLowerCase()
      .indexOf(searchText.toLowerCase()) !== -1 
       ) 
       
  }

}
