
using Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Datos
{
    public class ExpoSoftwareContext : IdentityDbContext<ApplicationUser>
    {
        public ExpoSoftwareContext(DbContextOptions<ExpoSoftwareContext> options) : base(options)
        {
        }

        public DbSet<Area> Areas { get; set; }
        public DbSet<Asignatura> Asignaturas { get; set; }
        public DbSet<Docente> Docentes { get; set; }
        public DbSet<Proyecto> Proyectos { get; set; }
        public DbSet<Estudiante> Estudiantes {get; set; }
        public DbSet<AspectoEvaluar> AspectoEvaluars {get; set; }
        public DbSet<Rubrica> Rubricas {get; set; }
        public DbSet<ProyectoEvaluado> ProyectosEvaluados {get;set;}
        
    }
}