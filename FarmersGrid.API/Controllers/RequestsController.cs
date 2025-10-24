using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using FarmersGrid.Models;
using Microsoft.AspNetCore.SignalR;
using FarmersGrid.API.Hubs;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : Controller
    {
        private readonly RequestsManager _requestsManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHubContext<RequestsHub> _hubContext;

        public record RequestItemDTO(
            int productId,
            decimal offeredPrice
        );

        public record CreateRequestDTO(
            string receiverId,
            string senderType,
            List<RequestItemDTO> items
        );

        public RequestsController(RequestsManager requestsManager, UserManager<ApplicationUser> userManager,IHubContext<RequestsHub> hubContext)
        {
            _requestsManager = requestsManager;
            _userManager = userManager;
            _hubContext = hubContext;
        }

        [HttpPost("create-request")]
        public async Task<int> CreateRequest([FromBody] CreateRequestDTO dto)
        {
            string senderId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            
            // Convert DTO items to tuple list
            var items = new List<(int productId, decimal offeredPrice)>();
            foreach (var item in dto.items)
            {
                items.Add((item.productId, item.offeredPrice));
            }

            var requestId = await _requestsManager.CreateRequestWithItems(senderId, dto.receiverId, dto.senderType, items);
            await _hubContext.Clients.User(dto.receiverId).SendAsync("RequestCreated", new { requestId });
            return requestId;
        }

        [HttpGet]
        public async Task<IEnumerable<RequestSummary>> GetMyRequests()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            return await _requestsManager.GetRequestsForUser(userId);
        }

        [HttpGet("{requestId}")]
        public async Task<object> GetRequestDetails(int requestId)
        {
            var (header, items) = await _requestsManager.GetRequestDetails(requestId);
            return new { header, items };
        }

        public record UpdateStatusDTO(int requestId, string status);
        [HttpPost("update-status")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDTO dto)
        {
            // call SP usp_UpdateRequestStatus
            await _requestsManager.UpdateRequestStatus(dto.requestId, dto.status);
            var (header, _) = await _requestsManager.GetRequestDetails(dto.requestId);
            await _hubContext.Clients.User(header.SenderId).SendAsync("RequestUpdated", new { requestId = dto.requestId, status = dto.status });
            await _hubContext.Clients.User(header.ReceiverId).SendAsync("RequestUpdated", new { requestId = dto.requestId, status = dto.status });
            return Ok();
        }
    }
}