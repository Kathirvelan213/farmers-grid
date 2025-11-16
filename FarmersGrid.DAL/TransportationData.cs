using Dapper;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FarmersGrid.DAL
{
    public class TransportationData
    {
        private readonly DbService _dbService;

        public TransportationData(DbService dbService)
        {
            _dbService = dbService;
        }

        public async Task<int> CreateSchedule(
            int requestId,
            DateTime startDate,
            DateTime? endDate,
            int frequency,
            string status = "Active")
        {
            var parameters = new DynamicParameters();
            parameters.Add("@RequestId", requestId);
            parameters.Add("@StartDate", startDate);
            parameters.Add("@EndDate", endDate);
            parameters.Add("@Frequency", frequency);
            parameters.Add("@Status", status);

            var result = await _dbService.ExecuteScalarAsync("usp_CreateSchedule", parameters);
            return (int)(decimal)result;
        }

        public async Task<IEnumerable<Schedule>> GetSchedulesByRequest(int requestId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@RequestId", requestId);

            return await _dbService.QueryAsync<Schedule>("usp_GetSchedulesByRequest", parameters);
        }

        public async Task UpdateSchedule(
            int scheduleId,
            DateTime? startDate = null,
            DateTime? endDate = null,
            string status = null)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ScheduleId", scheduleId);
            parameters.Add("@StartDate", startDate);
            parameters.Add("@EndDate", endDate);
            parameters.Add("@Status", status);

            await _dbService.ExecuteAsync("usp_UpdateSchedule", parameters);
        }

        public async Task<int> CreatePickup(int scheduleId, DateTime pickupDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ScheduleId", scheduleId);
            parameters.Add("@PickupDate", pickupDate);

            var result = await _dbService.ExecuteScalarAsync("usp_CreatePickup", parameters);
            return (int)(decimal)result;
        }

        public async Task<IEnumerable<Pickup>> GetPickupsBySchedule(int scheduleId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ScheduleId", scheduleId);

            return await _dbService.QueryAsync<Pickup>("usp_GetPickupsBySchedule", parameters);
        }

        public async Task UpdatePickupStatus(int pickupId, string status)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PickupId", pickupId);
            parameters.Add("@Status", status);

            await _dbService.ExecuteAsync("usp_UpdatePickupStatus", parameters);
        }

        public async Task<int> CreatePickupItem(int pickupId, int productId, int quantity)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PickupId", pickupId);
            parameters.Add("@ProductId", productId);
            parameters.Add("@Quantity", quantity);

            var result = await _dbService.ExecuteScalarAsync("usp_CreatePickupItem", parameters);
            return (int)(decimal)result;
        }

        public async Task<IEnumerable<PickupItem>> GetPickupItems(int pickupId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@PickupId", pickupId);

            return await _dbService.QueryAsync<PickupItem>("usp_GetPickupItems", parameters);
        }
    }
}
