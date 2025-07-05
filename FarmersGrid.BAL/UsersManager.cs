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
    public class UsersManager
    {
        private readonly UserData _userData;

        public UsersManager(UserData userData)
        {
            _userData=userData;
        }

        public async Task<IEnumerable<AspNetUser>> GetUsers()
        {
            return await _userData.GetUsers();
        }
    }
}
