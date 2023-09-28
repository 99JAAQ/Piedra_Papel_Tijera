using Microsoft.AspNetCore.Mvc;
using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Common.Dto.Player;
using Piedra.Papel.Tijera.Infraestructure.Models;
using Piedra.Papel.Tijera.Service.Interfaces;

namespace Piedra.Papel.Tijera.WebApi.Controllers
{
    [Route("api/players")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private IPlayerService _playerService;
        public PlayersController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate(LoginPlayerDto model)
        {
            BodyResponse<object> result = _playerService.Authenticate(model);
            return Ok(result);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            IEnumerable<Player> result = _playerService.GetPlayers();
            return Ok(result);
        }

        [HttpGet("GetPlayerById/{id}")]
        public IActionResult GetPlayerById(Guid id)
        {
            Player result = _playerService.GetPlayerById(id);
            return Ok(result);
        }

        [HttpPost("AddPlayer")]
        public IActionResult AddPlayer(AddPlayerDto model)
        {
            BodyResponse<object> result = _playerService.AddPlayer(model);
            return !result.IsSuccess ? BadRequest(result) : Ok(result);
        }

    }
}
