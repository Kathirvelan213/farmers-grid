﻿
using Dapper;
using FarmersGrid.Models;
using System.Data;

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
            DynamicParameters parameters = new DynamicParameters();
            return await _dbService.QueryAsync<Product>("usp_GetProducts", parameters);
        }
        public async Task<IEnumerable<MyProduct>> GetSellerProducts(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<MyProduct>("usp_GetSellerProducts", parameters);
        }
        public async Task<int> InsertSellerProduct(string userId, int productId,float price)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId",userId);
            parameters.Add("@productId",productId);
            parameters.Add("@unitPrice",price);
            parameters.Add("ReturnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

            return (int)(decimal)await _dbService.ExecuteScalarAsync("usp_InsertSellerProduct", parameters);

        }
        public async Task<int> DeleteSellerProduct(int id)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id", id);
            return await _dbService.ExecuteAsync("usp_DeleteSellerProduct", parameters);
        }
        public async Task<int> UpdateSellerProduct(int id,float unitPrice)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@id", id);
            parameters.Add("@unitPrice", unitPrice);
            return await _dbService.ExecuteAsync("usp_UpdateSellerProduct", parameters);
        }
    }
}
