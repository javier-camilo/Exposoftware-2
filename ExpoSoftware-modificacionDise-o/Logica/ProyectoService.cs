using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class ProyectoService
    {

         private readonly ExpoSoftwareContext _context;

        public ProyectoService(ExpoSoftwareContext context)
        {
            _context=context;
        }

        
        public GuardarProyectoResponse Guardar(Proyecto proyecto)
        {
            try
            {
                
                var ProyectoBuscado= _context.Proyectos.Find(proyecto.IdProyecto);

                if(ProyectoBuscado!=null){
                    
                    return new GuardarProyectoResponse("Error el proyecto ya se encuentra registrado");

                }

                _context.Proyectos.Add(proyecto);
                _context.SaveChanges();

                return new GuardarProyectoResponse(proyecto);
            }
            catch (Exception e)
            {
                return new GuardarProyectoResponse($"Error de la Aplicacion: {e.Message}");
            }
        }


        public class GuardarProyectoResponse 
        {
            public GuardarProyectoResponse(Proyecto proyecto)
            {
                Error = false;
                Proyecto = proyecto;
            }
            public GuardarProyectoResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Proyecto Proyecto { get; set; }
        }


        public List<Proyecto> ConsultarTodos()
        {
            List<Proyecto> proyectos = _context.Proyectos.ToList();
            return proyectos;
        }

        public List<Proyecto> consultarCondicion(string condicion){
            
            List<Proyecto> proyectos = _context.Proyectos.ToList();
            
            List<Proyecto> proyectosFiltrados = new List<Proyecto>();

            foreach (var item in proyectos)
            {
                if(item.IdentificacionDocente==condicion){
                    proyectosFiltrados.Add(item);
                }
                
            }
            
            return proyectosFiltrados;

        }



         public Proyecto BuscarxIdentificacion(string identificacion)
        {
            Proyecto proyecto = _context.Proyectos.Find(identificacion);
            return proyecto;
        }



         public string ModificarEstado(Proyecto proyecto)
        {
            try
            {
                var proyectoViejo = _context.Proyectos.Find(proyecto.IdProyecto);
                if (proyectoViejo != null)
                {
                    proyectoViejo.IdProyecto=proyecto.IdProyecto;
                    proyectoViejo.Titulo=proyectoViejo.Titulo;
                    proyectoViejo.Resumen=proyecto.Resumen;
                    proyectoViejo.Metodologia=proyecto.Metodologia;
                    proyectoViejo.Estado=proyecto.Estado;
                    proyectoViejo.CodigoAsignatura=proyecto.CodigoAsignatura;
                    proyectoViejo.IdentificacionDocente=proyecto.IdentificacionDocente;
                    proyectoViejo.IdentificacionEstudiante=proyecto.IdentificacionEstudiante;
                    _context.Proyectos.Update(proyectoViejo);
                    _context.SaveChanges();

                    return ($"El registro {proyectoViejo.Titulo} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {proyecto.IdProyecto} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }

        }
    }
}