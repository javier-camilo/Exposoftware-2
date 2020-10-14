using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpoSoftware.Services
{
    public interface ITokenGenerator
    {
        string GenerateToken(string username, string role);
    }
}
