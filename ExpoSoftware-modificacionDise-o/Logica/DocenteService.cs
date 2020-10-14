using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Logica
{
    public class DocenteService
    {
       
        private readonly ExpoSoftwareContext _context;

        public DocenteService(ExpoSoftwareContext context)
        {
            _context=context;
        }



        public class GuardarDocenteResponse
        {
            public GuardarDocenteResponse(Docente docente)
            {
                Error = false;
                Docente = docente;
            }
            public GuardarDocenteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Docente Docente { get; set; }
        }


        public GuardarDocenteResponse Guardar(Docente docente)
        {
            try
            {

                var docenteBuscado = _context.Docentes.Find(docente.Identificacion);

                if (docenteBuscado != null)
                {

                    return new GuardarDocenteResponse("Error el docente ya se encuentra guardado");

                }

                
                _context.Docentes.Add(docente);
                _context.SaveChanges();
                
                return new GuardarDocenteResponse(docente);
            }
            catch (Exception e)
            {
                return new GuardarDocenteResponse($"Error de la Aplicacion: {e.Message}");
            }

        }

        /**/
        public List<Docente> ConsultarTodos()
        {

            List<Docente> docentes = _context.Docentes.ToList();
            return docentes;
        }

        public Docente BuscarIdentificacion(string identificacion)
        {

            Docente docente =  _context.Docentes.Find(identificacion);
            return docente;
        }


        public string Eliminar(string identificacion)
        {
            try
            {

                var docente = _context.Docentes.Find(identificacion);
                if (docente != null)
                {
                     _context.Docentes.Remove(docente);
                    _context.SaveChanges();
                    return ($"El docente {docente.Nombre} se ha eliminado satisfactoriamente");
                }
                else
                {
                    return ($"Lo sentimos, {identificacion} no se encuentra registrada");
                }
            }
            catch (Exception e)
            {
                return $"Error de la Aplicación: {e.Message}";
            }
        }

        public string Modificar(Docente docenteNuevo)
        {
            try
            {

                var docenteViejo =  _context.Docentes.Find(docenteNuevo.Identificacion);

                if (docenteViejo != null)
                {

                    docenteViejo.Identificacion=docenteNuevo.Identificacion;
                    
                    docenteViejo.Nombre=docenteNuevo.Nombre;

                    
                    docenteViejo.Descripcion=docenteNuevo.Descripcion;

                    
                    docenteViejo.Tipo=docenteNuevo.Tipo;

                    
                    docenteViejo.Asignaturas=docenteNuevo.Asignaturas;

                    _context.Docentes.Update(docenteViejo);
                    _context.SaveChanges();

                    return ($"El registro {docenteNuevo.Identificacion} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {docenteNuevo.Identificacion} no se encuentra registrado");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }

        }

    }
}
