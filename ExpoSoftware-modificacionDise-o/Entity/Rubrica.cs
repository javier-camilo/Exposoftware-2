using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Rubrica
    {
        
        [Key]
        public string IdRubrica { get; set; }

        public string Titulo { get; set; }

        public string CodigoArea { get; set; }
        
    }
}