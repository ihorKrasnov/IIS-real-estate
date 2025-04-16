using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class Estate
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
        public bool IsAvailable { get; set; }
        public List<EstateImage> Images { get; set; }
        public List<EstateFeature> Features { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? SoldAt { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

    }

    public enum EstateType
    {
        Apartment = 1,         // Квартира
        House = 2,             // Будинок
        Commercial = 3,        // Комерційне приміщення
        Land = 4,              // Земельна ділянка
        Warehouse = 5,         // Склад
        Garage = 6             // Гараж
    }
}
