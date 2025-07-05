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

        public async Task<IEnumerable<AspNetUser>> GetUsers()
        {
            DynamicParameters parameters = new DynamicParameters();
            return await _dbService.QueryAsync<AspNetUser>("usp_GetUsers", parameters);
        }
    }
}
