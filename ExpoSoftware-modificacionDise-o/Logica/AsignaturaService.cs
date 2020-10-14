
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Logica
{
    public class AsignaturaService
    {

         private readonly ExpoSoftwareContext _context;

        public AsignaturaService(ExpoSoftwareContext context)
        {
            _context=context;
        }

        public GuardarAsignaturaResponse Guardar(Asignatura asignatura)
        {
            try
            {
                
                
                var asignaturaBuscada= _context.Asignaturas.Find(asignatura.CodigoAsignatura);

                if(asignaturaBuscada!=null){
                    
                    return new GuardarAsignaturaResponse("Error la asignatura ya se encuentra registrada");

                }

                _context.Asignaturas.Add(asignatura);
                _context.SaveChanges();

                return new GuardarAsignaturaResponse(asignatura);
            }
            catch (Exception e)
            {
                return new GuardarAsignaturaResponse($"Error de la Aplicacion: {e.Message}");
            }

        }


        public class GuardarAsignaturaResponse 
        {
            public GuardarAsignaturaResponse(Asignatura asignatura)
            {
                Error = false;
                Asignatura = asignatura;
            }
            public GuardarAsignaturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Asignatura Asignatura { get; set; }
        }


        public List<Asignatura> ConsultarTodos()
        {
            List<Asignatura> asignaturas = _context.Asignaturas.ToList();
            return asignaturas;
        }

        public Asignatura BuscarxIdentificacion(string identificacion)
        {
            Asignatura asignatura = _context.Asignaturas.Find(identificacion);
            return asignatura;

        }


        public string Eliminar(string identificacion)
        {
            try
            {
                var asignatura = _context.Asignaturas.Find(identificacion);
                if (asignatura != null)
                {
                    _context.Asignaturas.Remove(asignatura);
                    _context.SaveChanges();
                    return ($"El registro {asignatura.NombreAsignatura} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return $"Error de la Aplicación: {e.Message}";
            }
         

        }


        public string Modificar(Asignatura asignaturaNueva)
        {
            try
            {
                var asignaturaVieja = _context.Asignaturas.Find(asignaturaNueva.CodigoAsignatura);
                if (asignaturaVieja != null)
                {
                    asignaturaVieja.CodigoAsignatura=asignaturaNueva.CodigoAsignatura;
                    asignaturaVieja.NombreAsignatura=asignaturaNueva.NombreAsignatura;
                    asignaturaVieja.DescripcionAsignatura=asignaturaNueva.DescripcionAsignatura;
                    asignaturaVieja.AreaAsignatura=asignaturaNueva.AreaAsignatura;
                    _context.Asignaturas.Update(asignaturaVieja);
                    _context.SaveChanges();
                    return ($"El registro {asignaturaNueva.NombreAsignatura} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {asignaturaNueva.CodigoAsignatura} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }

        }

        

    }
}