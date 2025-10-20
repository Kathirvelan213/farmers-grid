using System.Collections.Generic;
using System.Threading.Tasks;
using FarmersGrid.DAL;

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
    }
}