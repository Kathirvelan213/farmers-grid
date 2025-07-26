using FarmersGrid.DAL;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.BAL
{
    public class AppUsersManager
    {
        private readonly UserData _userData;

        public AppUsersManager(UserData userData)
        {
            _userData=userData;
        }

        public async Task<IEnumerable<AspNetUser>> GetSellers(string userId)
        {
            return await _userData.GetSellers(userId);
        }
        public async Task<IEnumerable<AspNetUser>> GetRetailers(string userId)
        {
            return await _userData.GetRetailers(userId);
        }
        public async Task<IEnumerable<AspNetUser>> GetUserData(string userId)
        {
            return await _userData.GetUserData(userId);
        }
        public async Task<int> InsertInitialUserDetails(string userId,Coordinates coordinates)
        {
            await _userData.InsertInitialUserDetails(userId,coordinates);
            return await _userData.InsertBlankMatchRecords(userId);
        }
        public async Task<int> blankInsertionTest(string userId)
        {
            return await _userData.InsertBlankMatchRecords(userId);
        }
       
    }
}
