using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Infraestructure.Interfaces;
using Piedra.Papel.Tijera.Infraestructure.Models;
using Piedra.Papel.Tijera.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Service
{
    public class TokenService : ITokenService
    {
        private readonly JwtSetting _jwtSetting;
        private readonly IUnitOfWork _unitOfWork;

        public TokenService(IOptions<JwtSetting> jwtSetting, IUnitOfWork unitOfWork)
        {
            _jwtSetting = jwtSetting.Value;
            _unitOfWork = unitOfWork;
        }

        public string GenerateJwtToken(Player user)
        {
            // generate token that is valid for 15 minutes
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key = Encoding.ASCII.GetBytes(_jwtSetting.Key);

            //var idTenant = user.UserTenants.FirstOrDefault()?.TenantId;

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim("id", user.Id.ToString()));
            claims.AddClaim(new Claim("userName", user.UserName.ToString()));


            SecurityTokenDescriptor tokenDescriptor = new()
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
