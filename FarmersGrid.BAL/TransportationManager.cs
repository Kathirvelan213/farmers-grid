using FarmersGrid.DAL;
using FarmersGrid.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FarmersGrid.BAL
{
    public class TransportationManager
    {
        private readonly TransportationData _transportationData;

        public TransportationManager(TransportationData transportationData)
        {
            _transportationData = transportationData;
        }

        public async Task<int> CreateSchedule(
            int requestId,
            DateTime startDate,
            DateTime? endDate,
            int frequency,
            string status = "Active")
        {
            return await _transportationData.CreateSchedule(
                requestId, startDate, endDate, frequency, status);
        }

        public async Task<IEnumerable<Schedule>> GetSchedulesByRequest(int requestId)
        {
            return await _transportationData.GetSchedulesByRequest(requestId);
        }

        public async Task UpdateSchedule(
            int scheduleId,
            DateTime? startDate = null,
            DateTime? endDate = null,
            string status = null)
        {
            await _transportationData.UpdateSchedule(scheduleId, startDate, endDate, status);
        }

        public async Task<int> CreatePickup(int scheduleId, DateTime pickupDate)
        {
            return await _transportationData.CreatePickup(scheduleId, pickupDate);
        }

        public async Task<IEnumerable<Pickup>> GetPickupsBySchedule(int scheduleId)
        {
            return await _transportationData.GetPickupsBySchedule(scheduleId);
        }

        public async Task UpdatePickupStatus(int pickupId, string status)
        {
            await _transportationData.UpdatePickupStatus(pickupId, status);
        }

        public async Task<int> CreatePickupItem(int pickupId, int productId, int quantity)
        {
            return await _transportationData.CreatePickupItem(pickupId, productId, quantity);
        }

        public async Task<IEnumerable<PickupItem>> GetPickupItems(int pickupId)
        {
            return await _transportationData.GetPickupItems(pickupId);
        }
    }
}
