using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Common.Dto.Player;
using Piedra.Papel.Tijera.Infraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Service.Interfaces
{
    public interface IPlayerService
    {
        IEnumerable<Player> GetPlayers();
        Player GetPlayerById(Guid id);
        BodyResponse<object> AddPlayer(AddPlayerDto model);
        BodyResponse<object> Authenticate(LoginPlayerDto model);
    }
}
