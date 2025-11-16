using System;

namespace FarmersGrid.Models
{
    public class PickupItem
    {
        public int Id { get; set; }
        public int PickupId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
