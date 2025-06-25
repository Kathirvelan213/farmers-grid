using FarmersGrid.DAL;
using FarmersGrid.Models;

namespace FarmersGrid.BAL
{
    public class ProductsManager
    {
        private ProductsData _productsData;

        public ProductsManager(ProductsData productsData)
        {
            _productsData=productsData;
        }
        public async Task<IEnumerable<Product>> GetProductsData()
        {
            return await _productsData.GetProducts();
        }

        public async Task<IEnumerable<Product>> GetSellerProducts(string userId)
        {
            return await _productsData.GetSellerProducts(userId);
        }
    }
}
