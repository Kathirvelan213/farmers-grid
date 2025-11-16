using FarmersGrid.BAL;
using FarmersGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FarmersGrid.API.Controllers
{
    [Authorize(AuthenticationSchemes = "CookieAuth")]
    [ApiController]
    [Route("api/[controller]")]
    public class TransportationController : ControllerBase
    {
        private readonly TransportationManager _transportationManager;

        // DTOs
        public record CreateScheduleDTO(
            int RequestId,
            DateTime StartDate,
            DateTime? EndDate,
            int Frequency,
            string Status = "Active"
        );

        public record UpdateScheduleDTO(
            int ScheduleId,
            DateTime? StartDate = null,
            DateTime? EndDate = null,
            string Status = null
        );

        public record CreatePickupDTO(
            int ScheduleId,
            DateTime PickupDate
        );

        public record CreatePickupItemDTO(
            int PickupId,
            int ProductId,
            int Quantity
        );

        public record UpdatePickupStatusDTO(
            int PickupId,
            string Status
        );

        public TransportationController(TransportationManager transportationManager)
        {
            _transportationManager = transportationManager;
        }

        [HttpPost("create-schedule")]
        public async Task<int> CreateSchedule([FromBody] CreateScheduleDTO dto)
        {
            return await _transportationManager.CreateSchedule(
                dto.RequestId, dto.StartDate, dto.EndDate, dto.Frequency, dto.Status);
        }

        [HttpGet("schedules/{requestId}")]
        public async Task<IEnumerable<Schedule>> GetSchedules(int requestId)
        {
            return await _transportationManager.GetSchedulesByRequest(requestId);
        }

        [HttpPut("update-schedule")]
        public async Task<IActionResult> UpdateSchedule([FromBody] UpdateScheduleDTO dto)
        {
            await _transportationManager.UpdateSchedule(
                dto.ScheduleId, dto.StartDate, dto.EndDate, dto.Status);
            return Ok();
        }

        [HttpPost("create-pickup")]
        public async Task<int> CreatePickup([FromBody] CreatePickupDTO dto)
        {
            return await _transportationManager.CreatePickup(dto.ScheduleId, dto.PickupDate);
        }

        [HttpGet("pickups/{scheduleId}")]
        public async Task<IEnumerable<Pickup>> GetPickups(int scheduleId)
        {
            return await _transportationManager.GetPickupsBySchedule(scheduleId);
        }

        [HttpPost("pickup-items")]
        public async Task<int> CreatePickupItem([FromBody] CreatePickupItemDTO dto)
        {
            return await _transportationManager.CreatePickupItem(
                dto.PickupId, dto.ProductId, dto.Quantity);
        }

        [HttpGet("pickup-items/{pickupId}")]
        public async Task<IEnumerable<PickupItem>> GetPickupItems(int pickupId)
        {
            return await _transportationManager.GetPickupItems(pickupId);
        }

        [HttpPut("update-pickup-status")]
        public async Task<IActionResult> UpdatePickupStatus([FromBody] UpdatePickupStatusDTO dto)
        {
            await _transportationManager.UpdatePickupStatus(dto.PickupId, dto.Status);
            return Ok();
        }
    }
}
