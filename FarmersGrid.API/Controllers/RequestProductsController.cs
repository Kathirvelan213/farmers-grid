using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class RequestProductsController : Controller
    {
        private RequestProductsManager _requestProductsManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public record AddRequProductDTO(int productId, float unitPrice);
        public record RemoveRequProductDTO(int id);
        public record ChangeRequPriceDTO(int id, float unitPrice);

        public RequestProductsController(RequestProductsManager requestProductsManager,UserManager<ApplicationUser> userManager)
        {
            _requestProductsManager = requestProductsManager;
            _userManager = userManager;
        }
        [HttpGet("get-my-request-products")]
        public async Task<IEnumerable<MyProduct>> GetMyRequestProducts()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _requestProductsManager.GetRetailerRequestProducts(userId);
        }
        [HttpGet("get-retailer-request-products/{UserName}")]
        public async Task<IEnumerable<MyProduct>> GetRetailerRequestProducts(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await _requestProductsManager.GetRetailerRequestProducts(user.Id);
        }
        [HttpPost("add-product")]
        public async Task<int> AddRetailerRequestProduct([FromBody] AddRequProductDTO addRequProductDTO)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _requestProductsManager.InsertRetailerRequestProduct(userId, addRequProductDTO.productId, addRequProductDTO.unitPrice);
        }
        [HttpPut("change-price")]
        public async Task<int> ChangeRetailerRequestProduct([FromBody] ChangeRequPriceDTO changeRequPriceDTO)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _requestProductsManager.UpdateRetailerRequestProduct(userId,changeRequPriceDTO.id, changeRequPriceDTO.unitPrice);
        }
        [HttpDelete("remove-product")]
        public async Task<int> RemoveRetailerRequestProduct([FromBody] RemoveRequProductDTO removeRequProductDTO)
        {
            return await _requestProductsManager.DeleteRetailerRequestProduct(removeRequProductDTO.id);
        }
        
    }
}
