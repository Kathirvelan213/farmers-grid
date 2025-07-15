using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class RequestProductsController : Controller
    {
        private RequestProductsManager _requestProductsManager;

        public record AddRequProductDTO(int productId, float unitPrice);
        public record RemoveRequProductDTO(int id);
        public record ChangeRequPriceDTO(int id, float unitPrice);

        public RequestProductsController(RequestProductsManager requestProductsManager)
        {
            _requestProductsManager = requestProductsManager;
        }
        [HttpGet("get-request-products")]
        public async Task<IEnumerable<MyProduct>> GetRetailerRequestProducts()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _requestProductsManager.GetRetailerRequestProducts(userId);
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
            return await _requestProductsManager.UpdateRetailerRequestProduct(changeRequPriceDTO.id, changeRequPriceDTO.unitPrice);
        }
        [HttpDelete("remove-product")]
        public async Task<int> RemoveRetailerRequestProduct([FromBody] RemoveRequProductDTO removeRequProductDTO)
        {
            return await _requestProductsManager.DeleteRetailerRequestProduct(removeRequProductDTO.id);
        }
        
    }
}
