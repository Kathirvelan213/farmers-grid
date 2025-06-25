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

        public record AddProductDTO ( int productId, float price);
        public record RemoveProductDTO ( int id);

        public ProductsController(ProductsManager productsManager)
        {
            _productsManager = productsManager;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productsManager.GetProductsData();    
        }
        [HttpGet("/GetMyProducts")]
        public async Task<IEnumerable<Product>> GetMyProducts()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.GetSellerProducts(userId);
        }
        [HttpPost("/AddProduct")]
        public async Task<int> AddProduct(AddProductDTO addProductDTO)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.InsertSellerProduct(userId,addProductDTO.productId,addProductDTO.price);

        }
        [HttpPost("/RemoveProduct")]
        public async Task<int> RemoveProduct(RemoveProductDTO removeProductDTO)
        {
            return await _productsManager.DeleteSellerProduct(removeProductDTO.id);

        }
        



    }
}
