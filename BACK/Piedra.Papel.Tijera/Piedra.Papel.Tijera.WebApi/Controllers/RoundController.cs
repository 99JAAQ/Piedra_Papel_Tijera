using Microsoft.AspNetCore.Mvc;
using Piedra.Papel.Tijera.Common.Dto;
using Piedra.Papel.Tijera.Common.Dto.Round;
using Piedra.Papel.Tijera.Service.Interfaces;

namespace Piedra.Papel.Tijera.WebApi.Controllers
{
    [Route("api/round")]
    [ApiController]
    public class RoundController : ControllerBase
    {
        private readonly IRoundService _roundService;
        public RoundController(IRoundService roundService)
        {
            _roundService = roundService;
        }
        [HttpPost("AddRound")]
        public IActionResult AddRound(AddRoundDto model)
        {
            BodyResponse<object> result = _roundService.AddRound(model);
            return !result.IsSuccess ? BadRequest(result) : Ok(result);
        }
    }
}
