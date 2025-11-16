using System;

namespace FarmersGrid.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Frequency { get; set; } 
        public string Status { get; set; } // Active, Paused, Ended
        public DateTime CreatedAt { get; set; }
    }
}
