using Piedra.Papel.Tijera.Common.Dto.Player;
using Piedra.Papel.Tijera.Infraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Service.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(Player user);


    }
}
