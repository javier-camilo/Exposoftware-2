using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Area
    {
        [Key]
        public string CodigoArea { get; set; }
        public string NombreArea { get; set; }
    }
}