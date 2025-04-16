using Services.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Auth
{
    public class AuthResultDto
    {
        public string Token { get; set; }
        public UserProfileDto Profile { get; set; }
    }
}
