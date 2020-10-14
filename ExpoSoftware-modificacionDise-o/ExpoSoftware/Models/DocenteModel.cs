using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;

namespace ExpoSoftware.Models
{
    public class DocenteInputModel
    {
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public string Asignaturas { get; set; }
    }

    public class DocenteViewModel : DocenteInputModel
    {
        public DocenteViewModel()
        {

        }

        public DocenteViewModel(Docente docente)
        {
            Identificacion = docente.Identificacion;
            Nombre = docente.Nombre;
            Descripcion = docente.Descripcion;
            Tipo = docente.Tipo;
            Asignaturas = docente.Asignaturas;

        }
    }
}
