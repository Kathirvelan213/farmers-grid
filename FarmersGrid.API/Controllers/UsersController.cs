using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppUsersManager _AppUsersManager;

        public UsersController(AppUsersManager appUsersManager, UserManager<ApplicationUser> userManager)
        {
            _AppUsersManager = appUsersManager;
            _userManager = userManager;
        }

        [HttpGet("roles/{role}")]
        public async Task<IEnumerable<AspNetUser>> GetUsers(string role)
        {
            return await _AppUsersManager.GetUsers(role);
        }

        [HttpGet("{UserName}")]
        public async Task<IEnumerable<AspNetUser>> GetUserData(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await _AppUsersManager.GetUserData(user.Id);
        }
        [HttpGet("test/{UserName}")]
        public async Task<int> initialInsertionDummyAPI(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await _AppUsersManager.blankInsertionTest(user.Id);
        }
         
    }
}
