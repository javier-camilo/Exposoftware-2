using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class AreaService
    {

        private readonly ExpoSoftwareContext _context;

        public AreaService(ExpoSoftwareContext context)
        {
            _context=context;
        }


        public GuardarAreaResponse Guardar(Area area)
        {
            try
            {
                
                
                var areaBuscada= _context.Areas.Find(area.CodigoArea);

                if(areaBuscada!=null){
                    
                    return new GuardarAreaResponse("Error el area ya se encuentra registrada");

                }

                _context.Areas.Add(area);
                _context.SaveChanges();

                return new GuardarAreaResponse(area);

            }
            catch (Exception e)
            {
                return new GuardarAreaResponse($"Error de la Aplicacion: {e.Message}");
            }
            
        }


        public class GuardarAreaResponse 
        {
            public GuardarAreaResponse(Area area)
            {
                Error = false;
                Area = area;
            }
            public GuardarAreaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Area Area { get; set; }
        }


        public List<Area> ConsultarTodos()
        {
            List<Area> areas = _context.Areas.ToList();
            return areas;
            
        }


        public Area BuscarxIdentificacion(string identificacion)
        {
            Area area = _context.Areas.Find(identificacion);
            return area;
        }

        
        public string Modificar(Area areaNueva)
        {
            try
            {
                var areaVieja = _context.Areas.Find(areaNueva.CodigoArea);

                if (areaVieja != null)
                {

                    areaVieja.CodigoArea=areaNueva.CodigoArea;
                    areaVieja.NombreArea=areaNueva.NombreArea;
                    _context.Areas.Update(areaVieja);
                    _context.SaveChanges();

                    return ($"El registro {areaNueva.NombreArea} se ha modificado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {areaNueva.CodigoArea} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return $"Error de la Aplicación: {e.Message}";
            }

        }

        public string Eliminar(string identificacion)
        {
            try
            {

                var area = _context.Areas.Find(identificacion);
                if (area != null)
                {
                    _context.Areas.Remove(area);
                    _context.SaveChanges();
                    return ($"El registro {area.NombreArea} se ha eliminado satisfactoriamente.");
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




    }
}