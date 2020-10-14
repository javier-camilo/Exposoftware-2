using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datos;
using Entity;
using Logica;
using ExpoSoftware.Models;

namespace ExpoSoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RubricaController : ControllerBase
    {
        private readonly ExpoSoftwareContext _context;
        private readonly RubricaService _RubricaService;

        public RubricaController(ExpoSoftwareContext context)
        {
            _context = context;
            _RubricaService=new RubricaService(context);
        }

        // GET: api/Rubrica
        [HttpGet]
        public IEnumerable<RubricaViewModel> GetRubricas()
        {
            
            var rubricas = _RubricaService.ConsultarTodos().Select(p => new RubricaViewModel(p));
            return rubricas;
        }

        [HttpGet]
        [Route("GetRubricaArea/{condicion}")] 
        public ActionResult<RubricaViewModel> GetPorArea(string condicion)
        {
            var proyecto = consultarPorArea(condicion);
            return proyecto;
        }

        private RubricaViewModel consultarPorArea(string condicion){

            RubricaViewModel rubrica=new RubricaViewModel();

            foreach (var item in _context.Rubricas.ToList())
            {
                if(item.CodigoArea==condicion){
                    var rubricaMap = new RubricaViewModel(item);
                    rubrica=rubricaMap;
                }
                
            }

            return rubrica;


        }

        // GET: api/Rubrica/5
        [HttpGet("{id}")]
        public ActionResult<RubricaViewModel> GetRubrica(string id)
        {
            var rubricaBuscada = _RubricaService.BuscarIdentificacion(id);
            if (rubricaBuscada == null) return NotFound();
            var rubrica = new RubricaViewModel(rubricaBuscada);
            return rubrica;

        }

        // PUT: api/Rubrica/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRubrica(string id, Rubrica rubrica)
        {
            if (id != rubrica.IdRubrica)
            {
                return BadRequest();
            }

            _context.Entry(rubrica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RubricaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rubrica
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Rubrica> PostRubrica(RubricaInputModel rubricaInput)
        {
             Rubrica rubrica = Mapear(rubricaInput);
            var response = _RubricaService.Guardar(rubrica);
            if (response.Error)
            {
                ModelState.AddModelError("Guardar Rubrica", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Rubrica);

        }

        

        private Rubrica Mapear(RubricaInputModel rubricaInput)
        {
            var rubrica = new Rubrica
            {
                IdRubrica=rubricaInput.IdRubrica,
                Titulo=rubricaInput.Titulo,
                CodigoArea=rubricaInput.CodigoArea
            };
            return rubrica;
        }

        // DELETE: api/Rubrica/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rubrica>> DeleteRubrica(string id)
        {
            var rubrica = await _context.Rubricas.FindAsync(id);
            if (rubrica == null)
            {
                return NotFound();
            }


            var rubricaRef=rubrica.IdRubrica;
            _context.Rubricas.Remove(rubrica);


            foreach (var item in _context.AspectoEvaluars.ToList())
            {
                if(item.RefRubrica==rubricaRef){
                    _context.AspectoEvaluars.Remove(item);
                }
            }

            await _context.SaveChangesAsync();

            return rubrica;
            
        }

        private bool RubricaExists(string id)
        {
            return _context.Rubricas.Any(e => e.IdRubrica == id);
        }
    }
}
