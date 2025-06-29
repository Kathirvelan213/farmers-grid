using FarmersGrid.BAL;
using FarmersGrid.DAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private ChatManager _chatManager;

        public ChatController(ChatManager chatManager)
        {
            _chatManager = chatManager;
        }

        [HttpGet]
        public async Task<IEnumerable<ChatDTO>> GetMyChats()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _chatManager.GetChats(userId);
        }
        [HttpGet("{chatId}/messages")]
        public async Task<IEnumerable<Message>> GetChatMessages(int chatId)
        {
            return await _chatManager.GetMessages(chatId);
        }
        [HttpGet("unreadCount")]
        public async Task<IEnumerable<int>> GetUnreadMessageCount()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _chatManager.GetUnreadMessageCount(userId);
        }
    }

        
}
