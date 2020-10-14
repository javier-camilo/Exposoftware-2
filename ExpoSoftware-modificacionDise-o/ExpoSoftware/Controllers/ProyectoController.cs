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
    public class ProyectoController : ControllerBase
    {

        private readonly ProyectoService _ProyectoService;
        private readonly ExpoSoftwareContext _context;

        public ProyectoController(ExpoSoftwareContext context)
        {
            _ProyectoService = new ProyectoService(context);
            _context=context;
        }


        [HttpPost]
        public ActionResult<ProyectoViewModel> Post(ProyectoInputModel proyectoInput)
        {
            Proyecto proyecto = Mapear(proyectoInput);
            var response = _ProyectoService.Guardar(proyecto);

            if (response.Error)
            {
                ModelState.AddModelError("Guardar Proyecto", response.Mensaje);
                var problemaDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemaDetails);
            }
            return Ok(response.Proyecto);
        }


        private Proyecto Mapear(ProyectoInputModel proyectoInput)
        {
            var proyecto = new Proyecto
            {

                IdProyecto=proyectoInput.IdProyecto,
                Titulo=proyectoInput.Titulo,
                Resumen=proyectoInput.Resumen,
                Metodologia=proyectoInput.Metodologia,
                CodigoAsignatura=proyectoInput.CodigoAsignatura,
                IdentificacionEstudiante=proyectoInput.IdentificacionEstudiante,
                IdentificacionDocente=proyectoInput.IdentificacionDocente

            };
            return proyecto;
        }


        [HttpGet]
        public IEnumerable<ProyectoViewModel> Get()
        {
            var proyecto = _ProyectoService.ConsultarTodos().Select(p => new ProyectoViewModel(p));
            return proyecto;
        }


        [HttpGet]
        [Route("GetProyectosFiltros/{condicion}")] 
        public IEnumerable<ProyectoViewModel> GetCondicion(string condicion)
        {
            var proyecto = _ProyectoService.consultarCondicion(condicion).Select(p => new ProyectoViewModel(p));
            return proyecto;
        }

        [HttpGet]
        [Route("GetProyectosArea/{condicion}")] 
        public IEnumerable<ProyectoViewModel> GetPorArea(string condicion)
        {
            var proyecto = consultarPorArea(condicion).Select(p => new ProyectoViewModel(p));
            return proyecto;
        }

        private List<Proyecto> consultarPorArea(string condicion){


            List<Proyecto> listadoProyectos=new List<Proyecto>();

            foreach (var item in _context.Proyectos.ToList() )
            {
                var asignatura = _context.Asignaturas.Find(item.CodigoAsignatura);
                
                if(asignatura.AreaAsignatura==condicion && item.Estado=="Aprobado"){

                    listadoProyectos.Add(item);
                }
                
            }

            return listadoProyectos;

        }



        [HttpGet("{identificacion}")]
        public ActionResult<ProyectoViewModel> Get(string identificacion)
        {
            var proyecto = _ProyectoService.BuscarxIdentificacion(identificacion);
            if (proyecto == null) return NotFound();
            var proyectoViewModel = new ProyectoViewModel(proyecto);
            return proyectoViewModel;
        }


        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Proyecto proyecto )
        {
            var id = _ProyectoService.BuscarxIdentificacion(proyecto.IdProyecto);

            if (id == null)
            {
                string resultadoConsulta = "No se encontró registro";
                return resultadoConsulta;
            }


            var mensaje = _ProyectoService.ModificarEstado(proyecto);

            return Ok(mensaje);
        }



        
    }
}