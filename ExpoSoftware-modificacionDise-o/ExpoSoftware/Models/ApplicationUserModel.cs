using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpoSoftware.Models
{
    public class ApplicationUserInputModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string  Rol { get; set; }
    }

    
    public class ApplicationUserViewModel : ApplicationUserInputModel
    {
        public string Token { get; set; }
    }

    public class LoginRequest
    {
        public string UserNameorEmail { get; set; }
        public string  Password { get; set; }
    }

}
