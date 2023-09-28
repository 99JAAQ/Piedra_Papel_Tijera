using AutoMapper;
using Piedra.Papel.Tijera.Common.Dto.Player;
using Piedra.Papel.Tijera.Common.Dto.Round;
using Piedra.Papel.Tijera.Infraestructure.Models;

namespace Piedra.Papel.Tijera.Common.Utils
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Round, AddRoundDto>().ReverseMap();
            CreateMap<Player, AddPlayerDto>().ReverseMap();
        }
    }
}
