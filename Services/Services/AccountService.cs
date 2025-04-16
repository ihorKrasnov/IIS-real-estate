using Data;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Services.Models.Auth;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AccountService
    {
        private readonly dbContext context;
        private readonly JwtSettings jwtSettings;

        public AccountService(dbContext context, IOptions<JwtSettings> jwtOptions)
        {
            this.context = context;
            this.jwtSettings = jwtOptions.Value;
        }

        public async Task<AuthResultDto> LoginAsync(LoginFormDto loginForm)
        {
            var user = await context.Users
                .Where(x => x.Username == loginForm.Username)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (user == null || ValidatePassword(user, loginForm.Password) == false)
            {
                throw new Exception("Invalid username or password");
            }

            return new AuthResultDto
            {
                Token = GenerateToken(user),
                Profile = new Models.User.UserProfileDto
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    Id = user.Id,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    Username = user.Username
                }
            };
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("userId", user.Id.ToString()),
                new Claim("username", user.Username)
            }),
                Expires = DateTime.UtcNow.AddHours(jwtSettings.ExpiresInHours),
                Issuer = jwtSettings.Issuer,
                Audience = jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password, User user)
        {
            var hasher = new PasswordHasher<User>();

            return hasher.HashPassword(user, password);
        }

        private bool ValidatePassword(User user, string pass)
        {
            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, pass);

            return result == PasswordVerificationResult.Success;
        }
    }
}
