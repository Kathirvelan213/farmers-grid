using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : Controller
    {
        private readonly RequestsManager _requestsManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public record RequestItemDTO(
            int productId,
            decimal offeredPrice
        );

        public record CreateRequestDTO(
            string receiverId,
            string senderType,
            List<RequestItemDTO> items
        );

        public RequestsController(RequestsManager requestsManager, UserManager<ApplicationUser> userManager)
        {
            _requestsManager = requestsManager;
            _userManager = userManager;
        }

        [HttpPost("create-request")]
        public async Task<int> CreateRequest([FromBody] CreateRequestDTO dto)
        {
            string senderId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            // Convert DTO items to tuple list
            var items = new List<(int productId, decimal offeredPrice)>();
            foreach (var item in dto.items)
            {
                items.Add((item.productId, item.offeredPrice));
            }

            return await _requestsManager.CreateRequestWithItems(senderId, dto.receiverId, dto.senderType, items);
        }
    }
}