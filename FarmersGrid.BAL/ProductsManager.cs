using FarmersGrid.DAL;
using FarmersGrid.Models;

namespace FarmersGrid.BAL
{
    public class ProductsManager
    {
        private ProductsData _productsData;
        private ProductMatchData _productMatchData;

        public ProductsManager(ProductsData productsData,ProductMatchData productMatchData)
        {
            _productsData=productsData;
            _productMatchData = productMatchData;   
        }
        public async Task<IEnumerable<Product>> GetProductsData()
        {
            return await _productsData.GetProducts();
        }

        public async Task<IEnumerable<MyProduct>> GetSellerProducts(string userId)
        {
            return await _productsData.GetSellerProducts(userId);
        }
        public async Task<int> InsertSellerProduct(string userId, int productId, float price)
        {
            return await _productsData.InsertSellerProduct(userId, productId, price);
        }
        public async Task<int> DeleteSellerProduct(int id)
        {
            return await _productsData.DeleteSellerProduct(id);
        }
        public async Task<int> UpdateSellerProduct(string userId,int id,float price)
        {
            await _productsData.UpdateSellerProduct(id,price);
            return await _productMatchData.RefreshMatchScores(userId);
        }
        
    }
}
