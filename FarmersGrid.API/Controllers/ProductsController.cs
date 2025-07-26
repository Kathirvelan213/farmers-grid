using Microsoft.AspNetCore.Mvc;
using FarmersGrid.BAL;
using Microsoft.AspNetCore.Authorization;
using FarmersGrid.Models;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private ProductsManager _productsManager;

        public record AddProductDTO ( int productId, float unitPrice);
        public record RemoveProductDTO ( int id);
        public record ChangePriceDTO( int id,float unitPrice);
        public record SellerDTO(string sellerId);

        public ProductsController(ProductsManager productsManager)
        {
            _productsManager = productsManager;
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
        [HttpGet("get-seller-products")]
        public async Task<IEnumerable<MyProduct>> GetSellerProducts([FromBody] SellerDTO sellerDTO)
        {
            return await _productsManager.GetSellerProducts(sellerDTO.sellerId);
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
