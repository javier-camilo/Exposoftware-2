import { Component, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  usuario:string;
  mobileQuery: MediaQueryList;

  fillerNav=[
    {name:"Registro asignatura", route: "/asignaturaRegistro", icon:"note_add"},
    {name:"Consulta Asignatura", route: "/asignaturaConsulta", icon:"search"}
  ]

  
  fillerDocente=[
    {name:"Registro Docente", route: "/docenteRegistro", icon:"note_add"},
    {name:"Consulta Docente", route: "/docenteConsulta", icon:"search"}
  ]

  fillerArea=[
    {name:"Registro area", route: "/areaRegistro", icon:"note_add"},
    {name:"Consulta area", route: "/areaConsulta", icon:"search"}
  ]

  fillerProyecto=[
    {name:"Registro Proyecto", route: "/proyectoRegistro", icon:"note_add"},
    {name:"Consulta Solicitudes", route: "/proyectoSolicitudes", icon:"chrome_reader_mode"}
  ]

  fillerRubrica=[
    {name:"Registro Rubrica", route: "/rubricaRegistro", icon:"note_add"},
    {name:"Consulta Rubrica", route: "/rubricaConsulta", icon:"chrome_reader_mode"}
  ]

  fillerEvaluador=[
    {name:"busqueda Proyecto", route: "/proyectosBusqueda", icon:"find_replace"}
  ]


  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private authService : AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.Usuario();
  }

  shouldRun = true;

  
  logout(){

    this.authService.logoutUser();
    this.router.navigateByUrl('/');
    location.reload();

  }

  Usuario(){
    try {

      const user = this.authService.getCurrentUser();
      this.usuario=user.userName;
      

    } catch (error) {

      this.usuario="no user";
      
    }
  }



  

}
