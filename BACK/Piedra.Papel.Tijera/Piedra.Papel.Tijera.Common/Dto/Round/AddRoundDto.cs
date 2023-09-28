using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Common.Dto.Round
{
    public class AddRoundDto
    {
        public Guid Player1Id { get; set; }
        public Guid Player2Id { get; set; }
        public Guid WinnerId { get; set; }
    }
}
