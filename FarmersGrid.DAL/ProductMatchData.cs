using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.DAL
{
    public class ProductMatchData
    {
        private DbService _dbService;

        public ProductMatchData(DbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<int> RefreshMatchScores(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.ExecuteAsync("usp_RefreshMatchScores", parameters);
        }
    }
}
