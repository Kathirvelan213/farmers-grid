using FarmersGrid.DAL;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.BAL
{
    public class ChatManager
    {
        private readonly ChatData _chatData;

        public ChatManager(ChatData chatData)
        {
            _chatData = chatData;
        }

        public async Task<IEnumerable<Message>> GetMessages(int chatId)
        {
            return await _chatData.GetMessages(chatId);
        }
        public async Task<IEnumerable<ChatDTO>> GetChats(string userId)
        {
            return await _chatData.GetChats(userId);
        }
        public async Task<IEnumerable<int>> GetUnreadMessageCount(string userId)
        {
            return await _chatData.GetUnreadMessageCount(userId);
        }
        public async Task<int> StoreMessage(int chatId, string senderId, string message, ReadStatus readStatus, DeliveryStatus deliveryStatus)
        {
            DateTime timestamp = DateTime.Now;
            return await _chatData.InsertMessage(chatId, senderId, message, timestamp, readStatus, deliveryStatus);
        }
    }
}
