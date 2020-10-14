using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Asignatura
    {
        [Key]
        public string CodigoAsignatura { get; set; }
        public string NombreAsignatura { get; set; }
        public string AreaAsignatura { get; set; }
        public string DescripcionAsignatura { get; set; }
        
        
    }
}