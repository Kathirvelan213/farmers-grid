using Azure.Messaging;
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
        public async Task<Message> StoreMessage(int chatId, string senderId, string messageContent)
        {
            ReadStatus readStatus = ReadStatus.unread;
            DeliveryStatus deliveryStatus = DeliveryStatus.sent;
            DateTime timestamp = DateTime.Now;
            int messageId=await _chatData.InsertMessage(chatId, senderId, messageContent, timestamp, readStatus, deliveryStatus);
            Message message = new Message
            {
                id = messageId,
                chatId = chatId,
                senderId = senderId,
                message = messageContent,
                readStatus = readStatus,
                deliveryStatus = deliveryStatus,
                timestamp = timestamp
            };
            return message;
        }
    }
}
