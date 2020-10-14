using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datos;
using Entity;
using ExpoSoftware.Models;
using ExpoSoftware.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ExpoSoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AspectoEvaluarController : ControllerBase
    {
        private readonly ExpoSoftwareContext _context;
        private readonly IHubContext<SignalHub> _hubContext;

        public AspectoEvaluarController(ExpoSoftwareContext context,IHubContext<SignalHub> hubContext)
        {
            _context = context;
            _hubContext=hubContext;
        }

        // GET: api/AspectoEvaluar
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspectoEvaluar>>> GetAspectoEvaluars()
        {
            return await _context.AspectoEvaluars.ToListAsync();
        }

        
        [HttpGet]
        [Route("getPreguntas/{condicion}")] 
        public IEnumerable<AspectoEvaluar> GetAspectoEvaluars(string condicion)
        {
            List<AspectoEvaluar> listadoFiltrar = new List<AspectoEvaluar>();
            listadoFiltrar=_context.AspectoEvaluars.ToList();
            return obtenerFiltrado(listadoFiltrar,condicion);

        }


        private List<AspectoEvaluar> obtenerFiltrado(List<AspectoEvaluar> listadoFiltrar,string condicion){

            List<AspectoEvaluar> listado=new List<AspectoEvaluar>();

            foreach (var item in listadoFiltrar)
            {
                if(item.RefRubrica==condicion){
                    listado.Add(item);
                }
                
            }

            return listado;

        }


        // GET: api/AspectoEvaluar/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspectoEvaluar>> GetAspectoEvaluar(int id)
        {
            var aspectoEvaluar = await _context.AspectoEvaluars.FindAsync(id);

            if (aspectoEvaluar == null)
            {
                return NotFound();
            }

            return aspectoEvaluar;
        }

        // PUT: api/AspectoEvaluar/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspectoEvaluar(int id, AspectoEvaluar aspectoEvaluar)
        {
            if (id != aspectoEvaluar.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspectoEvaluar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspectoEvaluarExists(id))
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

        // POST: api/AspectoEvaluar
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AspectoEvaluar>> PostAspectoEvaluar(AspectoEvaluar aspectoEvaluar)
        {
            
            _context.AspectoEvaluars.Add(aspectoEvaluar);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("PreguntaRegistrado", aspectoEvaluar);
            return CreatedAtAction("GetAspectoEvaluar", new { id = aspectoEvaluar.Id }, aspectoEvaluar);
        }



        [HttpPost]
        [Route("PosPreguntas")] 

        public async Task<ActionResult<string>> PostPregunta(AspectoEvaluarInputModel[] aspectoEvaluarInputModel)
        {

            Guardar(aspectoEvaluarInputModel);
            await _context.SaveChangesAsync();

            return Ok("registro realizado");
        }

        private void Guardar(AspectoEvaluarInputModel[] aspectoEvaluarInputModel){

            foreach (var item in aspectoEvaluarInputModel)
            {
               var AspectoEvaluar = item.Crear();
              _context.AspectoEvaluars.Add(AspectoEvaluar);  

            }

        }

        

        // DELETE: api/AspectoEvaluar/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AspectoEvaluar>> DeleteAspectoEvaluar(int id)
        {
            var aspectoEvaluar = await _context.AspectoEvaluars.FindAsync(id);
            if (aspectoEvaluar == null)
            {
                return NotFound();
            }

            var borrar=aspectoEvaluar;
            _context.AspectoEvaluars.Remove(aspectoEvaluar);
            await _context.SaveChangesAsync();


            await _hubContext.Clients.All.SendAsync("BorrarRegistro", borrar);

            return aspectoEvaluar;
        }

        private bool AspectoEvaluarExists(int id)
        {
            return _context.AspectoEvaluars.Any(e => e.Id == id);
        }
    }
}
