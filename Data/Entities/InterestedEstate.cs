using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class InterestedEstate
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public int EstateId { get; set; }
        public  Estate Estate { get; set; }
        public DateTime InterestedAt { get; set; }
    }
}
