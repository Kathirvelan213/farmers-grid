using FarmersGrid.Models;

namespace FarmersGrid.API.Models
{
    public class RegisterDTO
    {
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public required Coordinates Coordinates { get; set; }
        public required string Role { get; set; }
    }

   
}
    