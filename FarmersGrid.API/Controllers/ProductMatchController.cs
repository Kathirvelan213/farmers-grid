using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductMatchController : Controller
    {
        private readonly ProductMatchManager _productMatchManager;

        public ProductMatchController(ProductMatchManager productMatchManager)
        {
            _productMatchManager = productMatchManager;
        }

        [HttpGet("refresh-scores")]
        public async Task<int> initialInsertionDummyAPI()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productMatchManager.RefreshMatchScores(userId);
        }
    }
}
