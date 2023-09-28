using Piedra.Papel.Tijera.Common.Dto.Round;
using Piedra.Papel.Tijera.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Service.Interfaces
{
    public interface IRoundService
    {
        BodyResponse<object> AddRound(AddRoundDto model);
    }
}
