﻿using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FarmersGrid.API
{
    public class UserIdProvider:IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
