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
    public class ProductsController : ControllerBase
    {
        private ProductsManager _productsManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public record AddProductDTO ( int productId, float unitPrice);
        public record RemoveProductDTO ( int id);
        public record ChangePriceDTO( int id,float unitPrice);

        public ProductsController(ProductsManager productsManager,UserManager<ApplicationUser> userManager)
        {
            _productsManager = productsManager;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productsManager.GetProductsData();    
        }
        [HttpGet("get-my-products")]
        public async Task<IEnumerable<MyProduct>> GetMyProducts()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.GetSellerProducts(userId);
        }
        [HttpGet("get-seller-products/{UserName}")]
        public async Task<IEnumerable<MyProduct>> GetSellerProducts(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await _productsManager.GetSellerProducts(user.Id);
        }
        [HttpPost("add-product")]
        public async Task<int> AddProduct([FromBody] AddProductDTO addProductDTO)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.InsertSellerProduct(userId,addProductDTO.productId,addProductDTO.unitPrice);
        }
        [HttpPut("change-price")]
        public async Task<int> ChangePrice([FromBody] ChangePriceDTO changePriceDTO)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.UpdateSellerProduct(userId,changePriceDTO.id,changePriceDTO.unitPrice);
        }
        [HttpDelete("remove-product")]
        public async Task<int> RemoveProduct([FromBody] RemoveProductDTO removeProductDTO)
        {
            return await _productsManager.DeleteSellerProduct(removeProductDTO.id);
        }
    }
}
