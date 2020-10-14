using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
   public class EstudianteService
    {
      
        private readonly ExpoSoftwareContext _context;

        public EstudianteService(ExpoSoftwareContext context)
        {
            _context=context;
        }



        public class GuardarEstudianteResponse
        {
            public GuardarEstudianteResponse(Estudiante estudiante)
            {
                Error = false;
                Estudiante = estudiante;
            }
            public GuardarEstudianteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Estudiante Estudiante { get; set; }
        }


        public GuardarEstudianteResponse Guardar(Estudiante estudiante)
        {
            try
            {


                var estudianteBuscado = _context.Estudiantes.Find(estudiante.Identificacion);

                if (estudianteBuscado != null)
                {

                    return new GuardarEstudianteResponse("Error el estudiante ya se encuentra guardado");

                }

                
                _context.Estudiantes.Add(estudiante);
                _context.SaveChanges();

                return new GuardarEstudianteResponse(estudiante);
            }
            catch (Exception e)
            {
                return new GuardarEstudianteResponse($"Error de la Aplicacion: {e.Message}");
            }

        }

        /**/
        public List<Estudiante> ConsultarTodos()
        {
            List<Estudiante> estudiantes = _context.Estudiantes.ToList();
            return estudiantes;
        }

        public Estudiante BuscarIdentificacion(string identificacion)
        {

            Estudiante estudiante =  _context.Estudiantes.Find(identificacion);
            return estudiante;

        }


        public string Eliminar(string identificacion)
        {
            try
            {
                var estudiante = _context.Estudiantes.Find(identificacion);
                if (estudiante != null)
                {
                    _context.Estudiantes.Remove(estudiante);
                    _context.SaveChanges();
                    return ($"El estudiante {estudiante.Identificacion} se ha eliminado satisfactoriamente");
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

        public string Modificar(Estudiante estudianteNuevo)
        {
            try
            {
                var estudianteViejo = _context.Estudiantes.Find(estudianteNuevo.Identificacion);
                if (estudianteViejo != null)
                {

                estudianteViejo.Identificacion = estudianteNuevo.Identificacion;
                estudianteViejo.Nombre = estudianteNuevo.Nombre;
                estudianteViejo.Correo=estudianteNuevo.Correo;
                estudianteViejo.celular=estudianteNuevo.celular;
                estudianteViejo.Asignatura=estudianteNuevo.Asignatura;

                     _context.Estudiantes.Update(estudianteViejo);
                    _context.SaveChanges();
                    return ($"El registro {estudianteNuevo.Identificacion} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {estudianteNuevo.Identificacion} no se encuentra registrado");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }

        }
    }
}
