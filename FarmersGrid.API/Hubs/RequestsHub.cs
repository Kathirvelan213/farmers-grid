using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FarmersGrid.API.Hubs
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    public class RequestsHub : Hub
    {
    }
}


