using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using System.ComponentModel.DataAnnotations;

namespace ExpoSoftware.Models
{

    public class ProyectoInputModel
    {

        [Required(ErrorMessage="La clave unica del proyecto es requerida")]
        [StringLength(10,ErrorMessage="maximo de 10")]
        public string IdProyecto { get; set; }

        [Required(ErrorMessage="el titulo del proyecto es requerido")]
        public string Titulo { get; set; }


        [Required(ErrorMessage="Debe dar un resumen")]
        public string Resumen { get; set; }


        [Required(ErrorMessage="debe digitar la metodologia")]
        public string Metodologia { get; set; }



        [Required(ErrorMessage="Debe seleccionar la asignatura referente")]
        public string CodigoAsignatura { get; set; }


        [Required(ErrorMessage="es necesario informacion del o los estudiante proyectistas")]
        public string IdentificacionEstudiante { get; set; }


        [Required(ErrorMessage="debe tener informacion del docente lider de proyecto")]
        public string IdentificacionDocente { get; set; }


    }

     public class ProyectoViewModel : ProyectoInputModel
    {
        public ProyectoViewModel()
        {

        }

        public ProyectoViewModel(Proyecto proyecto)
        {

            IdProyecto=proyecto.IdProyecto;
            Titulo=proyecto.Titulo;
            Resumen=proyecto.Resumen;
            Metodologia=proyecto.Metodologia;
            CodigoAsignatura=proyecto.CodigoAsignatura;
            IdentificacionEstudiante=proyecto.IdentificacionEstudiante;
            IdentificacionDocente=proyecto.IdentificacionDocente;
            Estado=proyecto.Estado;

        }

        public string Estado { get; set; }
    }


}