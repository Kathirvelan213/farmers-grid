using FarmersGrid.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.BAL
{
    public  class ProductMatchManager
    {
        private ProductMatchData _productMatchData;

        public ProductMatchManager(ProductMatchData productMatchData)
        {
            _productMatchData = productMatchData;
        }
        public async Task<int> RefreshMatchScores(string userId)
        {
            return await _productMatchData.RefreshMatchScores(userId);
        }
        public async Task<IEnumerable<MatchScoreRecord>> GetMatchScoresForSellers(string userId)
        {
            return await _productMatchData.GetMatchScoresForSellers(userId);
        }
        public async Task<IEnumerable<MatchScoreRecord>> GetMatchScoresForRetailers(string userId)
        {
            return await _productMatchData.GetMatchScoresForRetailers(userId);
        }
    }
}
