using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class EstateFeature
    {
        public int Id { get; set; }
        public int EstateId { get; set; }
        public Estate Estate { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
