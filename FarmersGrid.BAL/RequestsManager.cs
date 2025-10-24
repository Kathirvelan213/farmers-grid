using System.Collections.Generic;
using System.Threading.Tasks;
using FarmersGrid.DAL;
using FarmersGrid.Models;

namespace FarmersGrid.BAL
{
    public class RequestsManager
    {
        private readonly RequestsData _requestsData;

        public RequestsManager(RequestsData requestsData)
        {
            _requestsData = requestsData;
        }

        public async Task<int> CreateRequest(string senderId, string receiverId, string senderType)
        {
            return await _requestsData.CreateRequest(senderId, receiverId, senderType);
        }

        public async Task AddRequestItem(int requestId, int productId, decimal offeredPrice)
        {
            await _requestsData.AddRequestItem(requestId, productId, offeredPrice);
        }

        public async Task<int> CreateRequestWithItems(
            string senderId, 
            string receiverId, 
            string senderType, 
            List<(int productId, decimal offeredPrice)> items)
        {
            return await _requestsData.CreateRequestWithItems(senderId, receiverId, senderType, items);
        }

        public async Task<IEnumerable<RequestSummary>> GetRequestsForUser(string userId)
        {
            return await _requestsData.GetRequestsForUser(userId);
        }

        public async Task<(RequestSummary header, IEnumerable<RequestItemSummary> items)> GetRequestDetails(int requestId)
        {
            return await _requestsData.GetRequestDetails(requestId);
        }

        public async Task UpdateRequestStatus(int requestId, string status)
        {
            await _requestsData.UpdateRequestStatus(requestId, status);
        }
    }
}