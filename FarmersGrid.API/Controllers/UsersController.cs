using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UsersManager _usersManager;

        public UsersController(UsersManager usersManager)
        {
            _usersManager = usersManager;
        }

        [HttpGet]
        public async Task<IEnumerable<AspNetUser>> GetUsers()
        {
            return await _usersManager.GetUsers();
        }
    }
}
