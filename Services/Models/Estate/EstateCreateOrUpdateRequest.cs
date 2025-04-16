using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Estate
{
    public class EstateCreateOrUpdateRequest
    {
        public string Estate { get; set; } = string.Empty;
        public IFormFile[] Images { get; set; } = Array.Empty<IFormFile>();
    }
}
