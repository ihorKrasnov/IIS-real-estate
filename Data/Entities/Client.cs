using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ClientType ClientType { get; set; }
        public List<InterestedEstate> InterestedEstates { get; set; }
    }

    public enum ClientType
    {
        Individual = 1, // Фізична особа
        LegalEntity = 2 // Юридична особа
    }
}
