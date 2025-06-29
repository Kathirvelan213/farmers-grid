using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.Models
{
    public enum ReadStatus
    {
        unread,
        read
    }
    public enum DeliveryStatus
    {
        sending,
        sent,
        delivered
    }
    public class Message
    {
        public int id {  get; set; }
        public int chatId { get; set; }
        public string senderId { get; set; }
        public string message { get; set; }
        public DateTime timestamp { get; set; }
        public ReadStatus readStatus { get; set; }
        public DeliveryStatus deliveryStatus { get; set; }
    }
}
