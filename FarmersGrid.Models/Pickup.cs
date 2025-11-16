using System;

namespace FarmersGrid.Models
{
    public class Pickup
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public DateTime PickupDate { get; set; }
        public string Status { get; set; } // Scheduled, Completed, Missed
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
