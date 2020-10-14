using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Proyecto
    {
        [Key]
        public string IdProyecto { get; set; }

        public string Titulo { get; set; }

        public string Resumen { get; set; }

        public string Metodologia { get; set; }

        public string Estado { get; set; }

        public string CodigoAsignatura { get; set; }

        public string IdentificacionEstudiante { get; set; }

        public string IdentificacionDocente { get; set; }
        
    }
}