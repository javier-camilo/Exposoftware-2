using Microsoft.AspNetCore.Identity;

namespace Entity
{
    public class ApplicationUser : IdentityUser
    {
        public string Rol { get; set; }
    }
}
