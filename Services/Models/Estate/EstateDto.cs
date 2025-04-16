using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Estate
{
    public class EstateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public EstateType Type { get; set; }
        public decimal Price { get; set; }
        public float Area { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public List<EstateImageDto> Images { get; set; } = new();
    }

    public class EstateImageDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
    }
}
