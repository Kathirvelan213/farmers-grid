using Microsoft.AspNetCore.SignalR;

namespace FarmersGrid.API.Hubs
{
    public class ChatHub:Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("receiveMessage","hi");
        }
        public async Task BroadcastMessage(string message)
        {
            await Clients.All.SendAsync("receiveMessage",message);
        }

    }
}
