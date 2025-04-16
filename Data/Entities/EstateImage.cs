using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class EstateImage
    {
        public int Id { get; set; }
        public int EstateId { get; set; }
        public Estate Estate { get; set; }
        public string ImageUrl { get; set; }
    }
}
