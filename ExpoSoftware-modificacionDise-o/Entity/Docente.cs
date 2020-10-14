using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
   public class Docente
    {
        [Key]
        public string Identificacion { get; set; }
        public string Nombre { get; set; } 
        public string Descripcion { get; set; }
        public string Tipo{ get; set; }
        public string Asignaturas { get; set; }

    }
}
    