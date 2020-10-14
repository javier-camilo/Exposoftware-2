import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { Area } from '../model/area';

@Component({
  selector: 'app-area-consulta',
  templateUrl: './area-consulta.component.html',
  styleUrls: ['./area-consulta.component.css']
})
export class AreaConsultaComponent implements OnInit {

  searchText:string;
  areas:Area[];
  loading:boolean;

  constructor(private areaService:AreaService) { }

  ngOnInit(): void {

    this.searchText="";
    this.loading=true;
    this.areaService.get("areaComponent").subscribe(result=>{this.areas=result; this.loading=false; }

      );
      
  }

}
