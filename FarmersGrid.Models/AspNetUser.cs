using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.Models
{
    public class AspNetUser
    {
        public string id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string roleId { get; set; }
    }
    public class AspNetUserMatchObject
    {
        public AspNetUser aspNetUser { get; set; }
        public float matchPercentage { get; set; }
    }
}
