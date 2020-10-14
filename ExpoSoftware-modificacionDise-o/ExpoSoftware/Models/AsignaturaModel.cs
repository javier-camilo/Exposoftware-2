using System.ComponentModel.DataAnnotations;
using Entity;

namespace ExpoSoftware.Models
{
    public class AsignaturaInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        [StringLength(9,ErrorMessage="maximo de 9")]
        public string CodigoAsignatura { get; set; }
        

        [Required(ErrorMessage = "El nombre  es requerido")]
        public string NombreAsignatura { get; set; }
        

        
        [Required(ErrorMessage = "El area es requerida")]
        public string AreaAsignatura { get; set; }
        
        
        
        [Required(ErrorMessage = "la descripcion es requerida")]
        public string DescripcionAsignatura { get; set; }

    }
    
    public class AsignaturaViewModel : AsignaturaInputModel
     {
        public AsignaturaViewModel()
        {

        }
        
        public AsignaturaViewModel(Asignatura asignatura)
        {
            CodigoAsignatura = asignatura.CodigoAsignatura;
            NombreAsignatura = asignatura.NombreAsignatura;
            AreaAsignatura = asignatura.AreaAsignatura;
            DescripcionAsignatura = asignatura.DescripcionAsignatura;

        }
    }


}