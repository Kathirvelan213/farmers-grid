using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpGet("sellers")]
        public async Task<IEnumerable<AspNetUser>> GetSellers()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _AppUsersManager.GetSellers(userId);
        }
        [HttpGet("retailers")]
        public async Task<IEnumerable<AspNetUser>> GetRetailers()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _AppUsersManager.GetRetailers(userId);
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
