using AutoMapper;
using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Common.Dto.Player;
using Piedra.Papel.Tijera.Common.Interfaces;
using Piedra.Papel.Tijera.Common.Utils;
using Piedra.Papel.Tijera.Infraestructure.Interfaces;
using Piedra.Papel.Tijera.Infraestructure.Models;
using Piedra.Papel.Tijera.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using XAct.Users;
using XSystem.Security.Cryptography;

namespace Piedra.Papel.Tijera.Service
{
    public class PlayerService : IPlayerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUtility _utility;

        private string _KeySecret = "StrONG-AuThEnTicate-App-Server";
        public PlayerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public BodyResponse<object> Authenticate(LoginPlayerDto model)
        {
            Player player = _unitOfWork.Player.FirstOrDefault(x => x.UserName == model.UserName);
            if (player == null) throw new Exception("El usuario o contraseña es incorrecta");

            var passwordhash = PasswordHash(model.Password);
            if (player.Password != passwordhash) throw new Exception("Usuario o contraseña incorrecta");

            var jwtHelper = new JWT(_KeySecret);

           
            var token = jwtHelper.crearToken(player.Id, player.UserName, player.FullName);

            return new BodyResponse<object>
            {
                Code = token != null ? (int)HttpStatusCode.Created : (int)HttpStatusCode.BadRequest,
                IsSuccess = token != null,
                Message = token != null ? "Exitoso" : "Falló",
                Data = token
            };


            //return 
        }

        public IEnumerable<Player> GetPlayers()
        {
            return _unitOfWork.Player.GetAll();
        }

        public Player GetPlayerById(Guid id)
        {
            Player player =  _unitOfWork.Player.FirstOrDefault(p => p.Id == id);
            if (player == null) throw new Exception("Este jugador no existe");

            return player;
        }

        public BodyResponse<object> AddPlayer(AddPlayerDto model)
        {
            Player exist = _unitOfWork.Player.Find(a => a.UserName == model.UserName).FirstOrDefault();
            if (exist != null) throw new Exception("Ya existe un usuario con este nombre");

            Player newPlayer = _mapper.Map<Player>(model);
            newPlayer.Password = PasswordHash(model.Password);

            _unitOfWork.Player.Add(newPlayer);
            bool saved = _unitOfWork.Save() > 0;

            return new BodyResponse<object>
            {
                Code = saved ? (int)HttpStatusCode.Created : (int)HttpStatusCode.BadRequest,
                IsSuccess = saved,
                Message = saved ? "Exitoso" : "Falló",
                Data = "OK"
            };
        }

        private static string PasswordHash(string password)
        {
            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(password));
            return string.Concat(hash.Select(b => b.ToString("x3")));
        }

    }
}
