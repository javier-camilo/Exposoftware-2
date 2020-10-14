
using System.ComponentModel.DataAnnotations;
using Entity;



namespace ExpoSoftware.Models
{

    public class AspectoEvaluarInputModel
    {

        public AspectoEvaluar Crear(){

            AspectoEvaluar registro=new AspectoEvaluar();
            registro.Pregunta=Pregunta;
            registro.Valor=Valor;
            registro.RefRubrica=RefRubrica;
            return registro;

        }

        [Required(ErrorMessage = "La pregunta es requerida")]
        public string Pregunta { get; set; }

        [Required(ErrorMessage = "El Valor es requerido")]
        public double Valor { get; set; }

        [Required(ErrorMessage = "la rubrica a la que pertence es requerida")]
        public string RefRubrica { get; set; }
    }

    public class AspectoEvaluarViewModel : AspectoEvaluarInputModel
    {

        public AspectoEvaluarViewModel()
        {

        }

        public AspectoEvaluarViewModel(AspectoEvaluar aspectoEvaluar)
        {
            Id=aspectoEvaluar.Id;
            Pregunta = aspectoEvaluar.Pregunta;
            Valor = aspectoEvaluar.Valor;
            RefRubrica = aspectoEvaluar.RefRubrica;
        }

        public int Id { get; set; }

    }

    
}