using Microsoft.AspNetCore.Mvc;
using FarmersGrid.BAL;
using Microsoft.AspNetCore.Authorization;
using FarmersGrid.Models;

namespace FarmersGrid.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private ProductsManager _productsManager;

        public ProductsController(ProductsManager productsManager)
        {
            _productsManager = productsManager;
        }

        //[Authorize]
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProduct()
        {
            return await _productsManager.GetProductsData();    
        }


    }
}
