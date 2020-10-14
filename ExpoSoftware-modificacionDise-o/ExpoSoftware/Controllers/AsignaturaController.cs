using System.Collections.Generic;
using System.Linq;
using Entity;
using Logica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpoSoftware.Models;
using Microsoft.AspNetCore.Http;
using Datos;
using Microsoft.AspNetCore.Authorization;

namespace ExpoSoftware.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AsignaturaController : ControllerBase
    {

        private readonly AsignaturaService _AsignaturaService;
        

        public AsignaturaController(ExpoSoftwareContext context)
        {
            _AsignaturaService = new AsignaturaService(context);
        }


        [HttpPost]
        public ActionResult<AsignaturaViewModel> Post(AsignaturaInputModel asignaturaInput)
        {
            
            Asignatura asignatura = Mapear(asignaturaInput);
            var response = _AsignaturaService.Guardar(asignatura);
            if (response.Error) 
            {
                
                ModelState.AddModelError("Guardar Asignatura", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);

            }
            return Ok(response.Asignatura);
        }

        
        private Asignatura Mapear(AsignaturaInputModel asignaturaInput)
        {
            var asignatura = new Asignatura
            {
                CodigoAsignatura = asignaturaInput.CodigoAsignatura,
                NombreAsignatura = asignaturaInput.NombreAsignatura,
                AreaAsignatura = asignaturaInput.AreaAsignatura,
                DescripcionAsignatura=asignaturaInput.DescripcionAsignatura
            };
            return asignatura;
        }

       [HttpGet]
        public IEnumerable<AsignaturaViewModel> Gets()
        {
            var asignaturas = _AsignaturaService.ConsultarTodos().Select(p=> new AsignaturaViewModel(p));
            return asignaturas;
        }

        [HttpGet("{identificacion}")]
        public ActionResult<AsignaturaViewModel> Get(string identificacion)
        {
            var asignatura = _AsignaturaService.BuscarxIdentificacion(identificacion);
            if (asignatura == null) return NotFound();
            var asignaturaViewModel = new AsignaturaViewModel(asignatura);
            return asignaturaViewModel;
        }

        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _AsignaturaService.Eliminar(identificacion);
            return Ok(mensaje);
        }
        

        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Asignatura asignatura)
        {
            var id=_AsignaturaService.BuscarxIdentificacion(asignatura.CodigoAsignatura);
            if(id==null){
                string resultadoConsulta="no se encontro registro";
                return resultadoConsulta;
            }
            var mensaje=_AsignaturaService.Modificar(asignatura);
           return Ok(mensaje) ;

        }




    }
}