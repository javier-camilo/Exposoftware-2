using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Estudiante
    {
        [Key]
        public string Identificacion { get; set; }

        public string Nombre { get; set; }

        public string Correo { get; set; }

        public string celular { get; set; }

        public string Asignatura { get; set; }

        public int Semestre { get; set; }
    }
}
