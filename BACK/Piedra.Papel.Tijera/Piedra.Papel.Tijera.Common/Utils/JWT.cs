using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Common.Utils
{
    public class JWT
    {
        private readonly byte[] secret;
        public JWT(string secretKey)
        {
            this.secret = Encoding.ASCII.GetBytes(secretKey);
        }

        public string crearToken(Guid id, string usuarioRed, string nombreUsuario)
        {
            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim("idUser", id.ToString()));
            claims.AddClaim(new Claim("usuarioRed", usuarioRed));
            claims.AddClaim(new Claim("nombreUsuario", nombreUsuario));

            var tokenDescripcion = new SecurityTokenDescriptor()
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(this.secret),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = new JwtSecurityTokenHandler();
            var createdToken = token.CreateToken(tokenDescripcion);
            return token.WriteToken(createdToken);
        }
    }
}
