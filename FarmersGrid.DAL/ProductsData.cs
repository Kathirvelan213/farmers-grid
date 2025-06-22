
using Dapper;
using FarmersGrid.Models;

namespace FarmersGrid.DAL

{
    public class ProductsData
    {
        private readonly DbService _dbService;
        public ProductsData(DbService dbService)
        {
            _dbService = dbService;
        }
        public async Task<IEnumerable<Product>> GetProducts()
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            return await _dbService.QueryAsync<Product>("usp_GetProducts", dynamicParameters);
        }
    }
}
