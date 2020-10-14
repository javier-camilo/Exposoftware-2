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
    public class DocenteController : ControllerBase
    {
        private readonly DocenteService _DocenteService;
        public DocenteController(ExpoSoftwareContext context)
        {
            _DocenteService = new DocenteService(context);
        }



        // POST: api/Docente
        [HttpPost]
        public ActionResult<DocenteViewModel> Post(DocenteInputModel docenteInput)
        {
            Docente docente = Mapear(docenteInput);
            var response = _DocenteService.Guardar(docente);

            if (response.Error)
            {
                ModelState.AddModelError("Guardar Docente", response.Mensaje);
                var problemaDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemaDetails);
            }
            return Ok(response.Docente);
        }

        private Docente Mapear(DocenteInputModel docenteInput)
        {
            var docente = new Docente
            {
                Identificacion = docenteInput.Identificacion,
                Nombre = docenteInput.Nombre,
                Descripcion = docenteInput.Descripcion,
                Tipo = docenteInput.Tipo,
                Asignaturas = docenteInput.Asignaturas

            };
            return docente;
        }




        // GET: api/Docente
        [HttpGet]
        public IEnumerable<DocenteViewModel> Get()
        {
            var docentes = _DocenteService.ConsultarTodos().Select(p => new DocenteViewModel(p));
            return docentes;
        }

        // GET: api/Docente/5
        [HttpGet("{identificacion}")]
        public ActionResult<DocenteViewModel> Get(string identificacion)
        {
            var docente = _DocenteService.BuscarIdentificacion(identificacion);
            if (docente == null) return NotFound();
            var docenteViewModel = new DocenteViewModel(docente);
            return docenteViewModel;
        }



        // DELETE: api/ApiWithActions/5
        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _DocenteService.Eliminar(identificacion);
            return Ok(mensaje);
        }


        // PUT: api/Docente/5
        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Docente docente )
        {
            var id = _DocenteService.BuscarIdentificacion(docente.Identificacion);
            if (id == null)
            {
                string resultadoConsulta = "No se encontró registro";
                return resultadoConsulta;
            }
            var mensaje = _DocenteService.Modificar(docente);
            return Ok(mensaje);
        }
    }
}
