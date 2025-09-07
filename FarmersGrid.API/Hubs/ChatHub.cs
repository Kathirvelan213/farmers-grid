using FarmersGrid.BAL;
using FarmersGrid.DAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FarmersGrid.API.Hubs
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    public class ChatHub:Hub
    {
        private readonly ChatManager _chatManager;
        public ChatHub(ChatManager chatManager)
        {
            _chatManager = chatManager;
        }
        public override async Task OnConnectedAsync()
        {
            string userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var chats =await _chatManager.GetChats(userId);
            foreach(ChatDTO chat in chats)
            {
                Groups.AddToGroupAsync(Context.ConnectionId, chat.id.ToString());
            } 
        }
        public async Task BroadcastMessage(string message)
        {
            await Clients.All.SendAsync("receiveMessage",message);
        }
        public async Task<Message> ReceiveAtHub(int chatId,string messageContent)
        {
            string userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            Message message=await _chatManager.StoreMessage(chatId, userId, messageContent);
            await Clients.Group(chatId.ToString()).SendAsync("receiveMessage",message);
            return message;
        }
    }
}
