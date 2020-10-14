using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class AspectoEvaluar
    {
        [Key]
        public int Id { get; set;}
        public string Pregunta { get; set; }
        public double Valor { get; set; }
        public string RefRubrica { get; set; }
        
    }
}