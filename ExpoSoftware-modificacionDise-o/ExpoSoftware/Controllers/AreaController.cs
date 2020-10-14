using System.Collections.Generic;
using System.Linq;
using Entity;
using Logica;
using Datos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpoSoftware.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace ExpoSoftware.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AreaController : ControllerBase
    {

        private readonly AreaService _AreaService;
        

        public AreaController(ExpoSoftwareContext context)
        {

            _AreaService = new AreaService(context);

        }


        [HttpPost]
        
        public ActionResult<AreaViewModel> Post(AreaInputModel areaInputModel)
        {
            
            Area area = Mapear(areaInputModel);
            var response = _AreaService.Guardar(area);
            if (response.Error) 
            {
                
                ModelState.AddModelError("Guardar area", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);

            }
            return Ok(response.Area);
        }

        private Area Mapear(AreaInputModel areaInputModel)
        {
            var area = new Area
            {
                CodigoArea = areaInputModel.CodigoArea,
                NombreArea = areaInputModel.NombreArea
            };

            return area;
        }

        
        [HttpGet]
        public IEnumerable<AreaViewModel> Gets()
        {
            var areas = _AreaService.ConsultarTodos().Select(p=> new AreaViewModel(p));
            return areas;
        }

        
        [HttpGet("{identificacion}")]
        public ActionResult<AreaViewModel> Get(string identificacion)
        {
            var area = _AreaService.BuscarxIdentificacion(identificacion);
            if (area == null) return NotFound();
            var areaViewModel = new AreaViewModel(area);
            return areaViewModel;
        }

        
        [HttpPut("{identificacion}")]
        public ActionResult<string> Put(string identificacion, Area area)
        {
            var id=_AreaService.BuscarxIdentificacion(area.CodigoArea);
            if(id==null){
                string resultadoConsulta="no se encontro registro";
                return resultadoConsulta;
            }
            var mensaje=_AreaService.Modificar(area);
           return Ok(mensaje) ;

        }

        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _AreaService.Eliminar(identificacion);
            return Ok(mensaje);
        }
        

        
        
    }
}