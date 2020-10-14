using System.ComponentModel.DataAnnotations;
using Entity;

namespace ExpoSoftware.Models
{
     public class RubricaInputModel
    {

        [Required(ErrorMessage = "La identificacion es requerida")]
        [StringLength(4,ErrorMessage="maximo de 4")]
        public string IdRubrica { get; set; }


        [Required(ErrorMessage = "la pregunta es requerida")]
        public string Titulo { get; set; }


        [Required(ErrorMessage = "el codigo de area es requerida")]
        public string CodigoArea { get; set; }

    }


      public class RubricaViewModel : RubricaInputModel
     {

        public RubricaViewModel()
        {

        }
        
        public RubricaViewModel(Rubrica rubrica)
        {
            IdRubrica=rubrica.IdRubrica;
            Titulo=rubrica.Titulo;
            CodigoArea=rubrica.CodigoArea;
        }
        

    }
}