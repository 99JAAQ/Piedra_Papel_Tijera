using AutoMapper;
using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Common.Dto.Round;
using Piedra.Papel.Tijera.Infraestructure.Interfaces;
using Piedra.Papel.Tijera.Infraestructure.Models;
using Piedra.Papel.Tijera.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Service
{
    public class RoundService : IRoundService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoundService(IUnitOfWork unitOfWork, IMapper mapper )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public BodyResponse<object> AddRound(AddRoundDto model)
        {
            Round newRound = _mapper.Map<Round>(model);

            _unitOfWork.Round.Add(newRound);
            bool saved = _unitOfWork.Save() > 0;

            return new BodyResponse<object>
            {
                Code = saved ? (int)HttpStatusCode.Created : (int)HttpStatusCode.BadRequest,
                IsSuccess = saved,
                Message = saved ? "Exitoso" : "Falló",
                Data = "OK"
            };
        }

    }
}
