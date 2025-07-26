using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.DAL
{
    public record MatchScoreRecord(int Id, string SellerId, string RetailerId, int MatchedProductCount, double ProductMatchScoreForSeller,double ProductMatchScoreForRetailer,
    double PriceMatchScore,double Distance,double DistanceScore,double TotalMatchScoreForSeller,double TotalMatchScoreForRetailer);

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

        public async Task<IEnumerable<MatchScoreRecord>> GetMatchScoresForSellers(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<MatchScoreRecord>("usp_GetMatchScoresForSellers", parameters);
        }
        public async Task<IEnumerable<MatchScoreRecord>> GetMatchScoresForRetailers(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<MatchScoreRecord>("usp_GetMatchScoresForRetailers", parameters);
        }
    }
}
