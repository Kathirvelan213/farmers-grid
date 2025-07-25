using Dapper;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.DAL
{
    public class UserData
    {
        private readonly DbService _dbService;

        public UserData(DbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<IEnumerable<AspNetUser>> GetUsers(string role)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@role", role);
            return await _dbService.QueryAsync<AspNetUser>("usp_GetUsers", parameters);
        }
        public async Task<IEnumerable<AspNetUser>> GetUserData(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<AspNetUser>("usp_GetUserDetails", parameters);
        }

        public async Task<int> InsertInitialUserDetails(string userId, Coordinates coordinates)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            parameters.Add("@latitude", coordinates.Latitude);
            parameters.Add("@longitude", coordinates.Longitude);
            return await _dbService.ExecuteAsync("usp_InsertInitialUserDetails", parameters);

        }
        public async Task<int> InsertBlankMatchRecords(string userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.ExecuteAsync("usp_InsertBlankMatchRecords", parameters);
        }
    }
}
