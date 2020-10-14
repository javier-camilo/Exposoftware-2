using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Datos;
using Microsoft.AspNetCore.Identity;
using Entity;
using ExpoSoftware.Models;
using ExpoSoftware.Services;

namespace ExpoSoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenGenerator _tokenGenerator;

        public UsersController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, ITokenGenerator tokenGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenGenerator = tokenGenerator;
        }
         //[User/Post]
        [HttpPost]

        public async Task<ActionResult<ApplicationUserViewModel>> PostApplicationUser([FromBody]ApplicationUserInputModel applicationUser)
        {
            var user = new ApplicationUser
            {
                UserName = applicationUser.UserName,
                Email = applicationUser.Email,
                Rol = applicationUser.Rol
            };

            var result = await _userManager.CreateAsync(user, applicationUser.Password);

            if (!result.Succeeded)
            {
                ModelState.AddModelError("UsuarioYaTomado", "El usuario ya esta tomado po otra persona");
                return Conflict(ModelState);
            }

            return new ApplicationUserViewModel
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenGenerator.GenerateToken(user.UserName, user.Rol),
                Rol = user.Rol
            };

        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        
        public async Task<ActionResult<ApplicationUserViewModel>> Login([FromBody] LoginRequest login)
        {
            var user = await _userManager.FindByNameAsync(login.UserNameorEmail);

            if (user is null)
            {
                user = await _userManager.FindByEmailAsync(login.UserNameorEmail);

                if (user is null)
                    return BadRequest();
            }

            var result = await _signInManager.PasswordSignInAsync(user, login.Password, false, false);

            if (!result.Succeeded)
            {
                ModelState.AddModelError("ContraseñaInvalida", "La contraseña digitada no es correcta");
                return BadRequest(ModelState);
            }

            return new ApplicationUserViewModel
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenGenerator.GenerateToken(user.UserName, user.Rol),
                Rol = user.Rol
            };
        }





    }
}