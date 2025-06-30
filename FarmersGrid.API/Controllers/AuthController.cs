using FarmersGrid.API.Data;
using FarmersGrid.API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FarmersGrid.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO regiterDto)
        {
            var user = new ApplicationUser { UserName = regiterDto.Username, Email = regiterDto.Email, };
            var userCreatedResult = await _userManager.CreateAsync(user, regiterDto.Password);

            if (!userCreatedResult.Succeeded)
            {
                return BadRequest(userCreatedResult.Errors);
            }

            var roleAssignedResult = await _userManager.AddToRoleAsync(user, regiterDto.Role.ToLower());
            if (!roleAssignedResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                return BadRequest(roleAssignedResult.Errors);
            }
            return Ok("Successfully registered");

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                    new Claim(ClaimTypes.Name, loginDto.Email),
                    new Claim(ClaimTypes.Role, role)
                };
                string token = _GenerateJwtToken(claims);

                var identity = new ClaimsIdentity(claims, "CookieAuth");
                var principal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync("CookieAuth", principal);
                return Ok(new
                {
                    token,
                    user = new
                    {
                        id = user.Id
                    }
                });
            }
            return Unauthorized();

        }

        string _GenerateJwtToken(List<Claim> claims)
        {
            //        var claims = new[]
            //        {
            //    new Claim(ClaimTypes.Name, username),
            //    new Claim(ClaimTypes.Role, role)
            //};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
