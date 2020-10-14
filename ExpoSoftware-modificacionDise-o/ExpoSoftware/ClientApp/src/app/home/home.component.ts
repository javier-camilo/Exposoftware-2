import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  noticias:any[]=[
    {
      name:"Docentes Habilitados",
      img:"../../assets/universidad.JPG",
      desc:"Docentes habilitados para la feria",
      route:"/docenteConsulta"
    },
    
    {
      name:"Los Mejores",
      img:"../../assets/primer_puesto.JPG",
      desc:"ver el listado de los ganadores de la feria exposoftware",
      route:""
    },

    {
      name:"Registro De Areas",
      img:"../../assets/Captura.JPG",
      desc:"formulario de areas habilitadas para la feria exposoftware",
      route:"/areaRegistro"
    }
  ];

  constructor(){

  }


  ngOnInit() {
    
  }
  
}
