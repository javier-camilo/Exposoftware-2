
using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class RubricaService
    {

        private readonly ExpoSoftwareContext _context;

        public RubricaService(ExpoSoftwareContext context)
        {
            _context=context;
        }


         public class GuardarRubricaResponse
        {
            public GuardarRubricaResponse(Rubrica rubrica)
            {
                Error = false;
                Rubrica = rubrica;
            }
            public GuardarRubricaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }

            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Rubrica Rubrica { get; set; }
        }


        
        public GuardarRubricaResponse Guardar(Rubrica rubrica)
        {
            try
            {


                var rubricaBuscada = _context.Rubricas.Find(rubrica.IdRubrica);

                if (rubricaBuscada != null)
                {

                    return new GuardarRubricaResponse("Error la rubrica ya esta registrada");

                }

                List<Rubrica> listado=ConsultarTodos();

                foreach (var item in listado)
                {
                    if(item.CodigoArea==rubrica.CodigoArea){
                        
                            return new GuardarRubricaResponse("Error la rubrica ya esta asociada a un area");
                    
                    }
                    
                }

                _context.Rubricas.Add(rubrica);
                _context.SaveChanges();

                return new GuardarRubricaResponse(rubrica);
            }

            catch (Exception e)
            {
                return new GuardarRubricaResponse($"Error de la Aplicacion: {e.Message}");
            }


        }


        public List<Rubrica> ConsultarTodos()
        {
            List<Rubrica> rubricas = _context.Rubricas.ToList();
            return rubricas;
        }

        
        public Rubrica BuscarIdentificacion(string identificacion)
        {

            Rubrica rubrica =  _context.Rubricas.Find(identificacion);
            return rubrica;

        }


        
    }
}