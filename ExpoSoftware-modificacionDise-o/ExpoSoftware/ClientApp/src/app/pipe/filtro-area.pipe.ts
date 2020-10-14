import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../comite/area/model/area';

@Pipe({
  name: 'filtroArea'
})
export class FiltroAreaPipe implements PipeTransform {

  transform(areas:Area[],searchText:string): Area[] {

    if(searchText==null)return areas;

    return areas.filter(p =>

      p.codigoArea.toLowerCase()
     .indexOf(searchText.toLowerCase()) !== -1 ||

     p.nombreArea.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1  );


    
  }

}
