using System;

namespace FarmersGrid.Models
{
    public class RequestSummary
    {
        public int RequestId { get; set; }
        public string SenderId { get; set; }
        public string SenderName { get; set; }
        public string ReceiverId { get; set; }
        public string ReceiverName { get; set; }
        public string Status { get; set; }
        public string SenderType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}


