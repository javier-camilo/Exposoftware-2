using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datos;
using Entity;

namespace ExpoSoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectoEvaluadoController : ControllerBase
    {
        private readonly ExpoSoftwareContext _context;

        public ProyectoEvaluadoController(ExpoSoftwareContext context)
        {
            _context = context;
        }

        // GET: api/ProyectoEvaluado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProyectoEvaluado>>> GetProyectosEvaluados()
        {
            return await _context.ProyectosEvaluados.ToListAsync();
        }

        [HttpGet]
        [Route("GetEvaluacionFiltros/{condicion}")] 
        public IEnumerable<ProyectoEvaluado> GetCondicion(string condicion)
        {
            var proyecto = consultarCondicion(condicion,_context.ProyectosEvaluados.ToList());
            return proyecto;
        }

        [HttpGet]
        [Route("Total/{idProyecto}")] 
        public ActionResult<double> GetTotal(string idProyecto)
        {
            var listado =consultarCondicion(idProyecto,_context.ProyectosEvaluados.ToList());
            double total=0.0,resultado=0.0;

            foreach (var item in listado)
            {
                total=total+item.Valor;
            }

            resultado=total/listado.Count;
            return resultado;
        }

        private List<ProyectoEvaluado> consultarCondicion(string condicion, List<ProyectoEvaluado> listado){

            List<ProyectoEvaluado> listadoFiltrado=new List<ProyectoEvaluado>();
            foreach (var item in listado)
            {
                if(item.IdProyecto==condicion){
                    listadoFiltrado.Add(item);
                }
                
            }

            return listadoFiltrado;
        }


    

        // GET: api/ProyectoEvaluado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProyectoEvaluado>> GetProyectoEvaluado(int id)
        {
            var proyectoEvaluado = await _context.ProyectosEvaluados.FindAsync(id);

            if (proyectoEvaluado == null)
            {
                return NotFound();
            }

            return proyectoEvaluado;
        }

        // PUT: api/ProyectoEvaluado/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProyectoEvaluado(int id, ProyectoEvaluado proyectoEvaluado)
        {
            if (id != proyectoEvaluado.Id)
            {
                return BadRequest();
            }

            _context.Entry(proyectoEvaluado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProyectoEvaluadoExists(id))
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

        // POST: api/ProyectoEvaluado
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProyectoEvaluado>> PostProyectoEvaluado(ProyectoEvaluado proyectoEvaluado)
        {
            _context.ProyectosEvaluados.Add(proyectoEvaluado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProyectoEvaluado", new { id = proyectoEvaluado.Id }, proyectoEvaluado);
        }


        [HttpPost]
        [Route("PosPreguntas")] 

        public async Task<ActionResult<string>> PostProyectosRegistrados(ProyectoEvaluado[] proyectoEvaluado)
        {

            Guardar(proyectoEvaluado);
            await _context.SaveChangesAsync();

            return Ok("registro realizado");
        }

        private void Guardar(ProyectoEvaluado[] proyectoEvaluado){

            foreach (var item in proyectoEvaluado)
            {
                _context.ProyectosEvaluados.Add(item);
                
            }

        }
       

        // DELETE: api/ProyectoEvaluado/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProyectoEvaluado>> DeleteProyectoEvaluado(int id)
        {
            var proyectoEvaluado = await _context.ProyectosEvaluados.FindAsync(id);
            if (proyectoEvaluado == null)
            {
                return NotFound();
            }

            _context.ProyectosEvaluados.Remove(proyectoEvaluado);
            await _context.SaveChangesAsync();

            return proyectoEvaluado;
        }

        private bool ProyectoEvaluadoExists(int id)
        {
            return _context.ProyectosEvaluados.Any(e => e.Id == id);
        }
    }
}
