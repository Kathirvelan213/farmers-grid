﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FarmersGrid.Models
{
    public class MyProduct
    {
        public int id { get; set; }
        public int productId { get; set; }
        public string name{ get; set; }
        public string description{ get; set; }
        public string imageUrl { get; set; }
        public float unitPrice { get; set; }

    }
}
