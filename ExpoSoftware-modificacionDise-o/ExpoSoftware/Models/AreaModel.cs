using System.ComponentModel.DataAnnotations;
using Entity;

namespace ExpoSoftware.Models
{
    public class AreaInputModel
    {

        [Required(ErrorMessage = "La identificacion es requerida")]
        [StringLength(2,ErrorMessage="maximo de 2")]
        public string CodigoArea { get; set; }


        [Required(ErrorMessage = "El nombre  es requerido")]
        public string NombreArea { get; set; }

    }


      public class AreaViewModel : AreaInputModel
     {

        public AreaViewModel()
        {

        }
        
        public AreaViewModel(Area area)
        {
            CodigoArea = area.CodigoArea;
            NombreArea = area.NombreArea;
        }
        

    }

    

}