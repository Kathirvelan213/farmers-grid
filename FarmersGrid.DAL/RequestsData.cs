using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using FarmersGrid.Models;
using System.Data;

namespace FarmersGrid.DAL
{
    public class RequestsData
    {
        private readonly DbService _dbService;

        public RequestsData(DbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<int> CreateRequest(
            string senderId,
            string receiverId,
            string senderType)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@SenderId", senderId);
            parameters.Add("@ReceiverId", receiverId);
            parameters.Add("@SenderType", senderType);

            // Create the main request and get the RequestId
            var result = await _dbService.ExecuteScalarAsync("usp_CreateRequest", parameters);
            return (int)(decimal)result;
        }

        public async Task AddRequestItem(
            int requestId,
            int productId,
            decimal offeredPrice)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@RequestId", requestId);
            parameters.Add("@ProductId", productId);
            parameters.Add("@OfferedPrice", offeredPrice);

            await _dbService.ExecuteAsync("usp_AddRequestItem", parameters);
        }

        public async Task<int> CreateRequestWithItems(
            string senderId,
            string receiverId,
            string senderType,
            List<(int productId, decimal offeredPrice)> items)
        {
            // Create the main request
            var requestId = await CreateRequest(senderId, receiverId, senderType);

            // Add all items to the request
            foreach (var item in items)
            {
                await AddRequestItem(requestId, item.productId, item.offeredPrice);
            }

            return requestId;
        }

        public async Task<IEnumerable<RequestSummary>> GetRequestsForUser(string userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", userId);
            return await _dbService.QueryAsync<RequestSummary>("usp_GetRequestsForUser", parameters);
        }

        public async Task<(RequestSummary header, IEnumerable<RequestItemSummary> items)> GetRequestDetails(int requestId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@RequestId", requestId);

            using var conn = _dbService.CreateConnection();
            using var multi = await conn.QueryMultipleAsync("usp_GetRequestDetails", parameters, commandType: CommandType.StoredProcedure);

            var header = await multi.ReadFirstAsync<RequestSummary>();
            var items = await multi.ReadAsync<RequestItemSummary>();
            return (header, items);
        }

        public async Task UpdateRequestStatus(int requestId, string status)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@RequestId", requestId);
            parameters.Add("@Status", status);
            await _dbService.ExecuteAsync("usp_UpdateRequestStatus", parameters);
        }
    }
}