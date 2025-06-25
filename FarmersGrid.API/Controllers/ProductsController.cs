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

        public ProductsController(ProductsManager productsManager)
        {
            _productsManager = productsManager;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProduct()
        {
            return await _productsManager.GetProductsData();    
        }
        [HttpGet("/GetMyProducts")]
        public async Task<IEnumerable<Product>> GetSellerProduct()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _productsManager.GetSellerProducts(userId);
        }
        



    }
}
