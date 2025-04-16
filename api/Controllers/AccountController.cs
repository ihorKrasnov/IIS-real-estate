using Microsoft.AspNetCore.Mvc;
using Services.Models.Auth;
using Services.Services;

namespace api.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {   
        private readonly AccountService accountService;

        public AccountController(AccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResultDto>> Login([FromBody] LoginFormDto loginForm)
        {   
            return Ok(await this.accountService.LoginAsync(loginForm));
        }
    }
}
