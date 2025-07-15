using Dapper;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.DAL
{
    public class RequestProductsData
    {
        private readonly DbService _dbService;

        public RequestProductsData(DbService dbService)
        {
            _dbService = dbService;
        }
        public async Task<IEnumerable<MyProduct>> GetRetailerRequestProducts(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<MyProduct>("usp_GetRetailerRequests", parameters);
        }
        public async Task<int> InsertRetailerRequestProduct(string userId, int productId, float price)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            parameters.Add("@productId", productId);
            parameters.Add("@unitPrice", price);
            parameters.Add("ReturnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

            return (int)(decimal)await _dbService.ExecuteScalarAsync("usp_InsertRetailerRequest", parameters);

        }
        public async Task<int> DeleteRetailerRequestProduct(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id", id);
            return await _dbService.ExecuteAsync("usp_DeleteRetailerRequest", parameters);
        }
        public async Task<int> UpdateRetailerRequestProduct(int id, float unitPrice)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id", id);
            parameters.Add("@unitPrice", unitPrice);
            return await _dbService.ExecuteAsync("usp_UpdateRetailerRequest", parameters);
        }
    }
}
