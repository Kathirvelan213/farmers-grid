using FarmersGrid.DAL;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.BAL
{
    public class RequestProductsManager
    {
        private RequestProductsData _requestProductsData;
        private ProductMatchData _productMatchData;

        public RequestProductsManager(RequestProductsData requestProductsData,ProductMatchData productMatchData)
        {
            _requestProductsData = requestProductsData;
            _productMatchData = productMatchData;
        }
        public async Task<IEnumerable<MyProduct>> GetRetailerRequestProducts(string userId)
        {
            return await _requestProductsData.GetRetailerRequestProducts(userId);
        }
        public async Task<int> InsertRetailerRequestProduct(string userId, int productId, float price)
        {
            return await _requestProductsData.InsertRetailerRequestProduct(userId, productId, price);
        }
        public async Task<int> DeleteRetailerRequestProduct(int id)
        {
            return await _requestProductsData.DeleteRetailerRequestProduct(id);
        }
        public async Task<int> UpdateRetailerRequestProduct(string userId,int id, float price)
        {
            await _requestProductsData.UpdateRetailerRequestProduct(id, price);
            return await _productMatchData.RefreshMatchScores(userId);
        }
    }
}
