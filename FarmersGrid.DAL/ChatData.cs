using Dapper;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FarmersGrid.DAL
{
    public record ChatDTO(int id,string otherUserId, string otherUserName);
    public class ChatData
    {
        private readonly DbService _dbService;

        public ChatData(DbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<IEnumerable<Message>> GetMessages(int chatId)
        {
            DynamicParameters parameters=new DynamicParameters();
            parameters.Add("@chatId", chatId);
            return await _dbService.QueryAsync<Message>("usp_GetMessages", parameters);
        }
        public async Task<IEnumerable<ChatDTO>> GetChats(string userId)
        {
            DynamicParameters parameters=new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<ChatDTO>("usp_GetConversations", parameters);
        }
        public async Task<IEnumerable<int>> GetUnreadMessageCount(string userId)
        {
            DynamicParameters parameters=new DynamicParameters();
            parameters.Add("@userId", userId);
            return await _dbService.QueryAsync<int>("usp_GetUnreadMessageCount", parameters);
        }
        public async Task<int> InsertMessage(int chatId, string senderId,string message,DateTime timestamp,ReadStatus readStatus,DeliveryStatus deliveryStatus)
        {
            DynamicParameters parameters=new DynamicParameters();
            parameters.Add("@chatId", chatId);
            parameters.Add("@senderId", senderId);
            parameters.Add("@message", message);
            parameters.Add("@timestamp", timestamp);
            parameters.Add("@readStatus", readStatus);
            parameters.Add("@deliveryStatus", deliveryStatus);
            parameters.Add("ReturnValue", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

            return (int)(decimal)await _dbService.ExecuteScalarAsync("usp_InsertMessage", parameters);

        }
    }
}
