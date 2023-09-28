using Microsoft.AspNetCore.SignalR;
using Piedra.Papel.Tijera.Common.Dto.Player;

namespace Piedra.Papel.Tijera.WebApi.Hubs
{
    public class SignalHub : Hub
    {
        static List<ListPlayerDto> _users = new List<ListPlayerDto>();

        ///Invitación a Jugar
        public async Task enviarRespuesta(string sala, string usuario, string mensaje)
        {
            await Clients.Group(sala).SendAsync("EnviarRespuesta", usuario, mensaje);
        }
        public async Task registrarSala(string id, string FullName)
        {
            _users = _users.ToList().Where(a => a.Id != id).ToList();

            _users.Add(new ListPlayerDto() { Id = id, FullName = FullName });

            await Groups.AddToGroupAsync(Context.ConnectionId, id);
        }

        public async Task obtenerUsuariosSala()
        {
            await Clients.All.SendAsync("obtenerUsuariosResponse", _users.ToList());
        }

        public async Task desconectarUsuario(string id)
        {
            _users = _users.Where(a => a.Id != id).ToList();
            await Clients.All.SendAsync("obtenerUsuariosResponse", _users.ToList());
        }

        public async Task invitarJugar(string idUsuarioDestino, string idUsuarioInvita, string nombreUsuarioInvita)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("invitarJugarResponse", nombreUsuarioInvita, idUsuarioInvita);
        }
        public async Task rechazarAprobarInvitacion(string idUsuarioDestino, string idUsuario, string rechazoAprobarInvitacion)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("rechazarAprobarInvitacionResponse", idUsuario, rechazoAprobarInvitacion);
        }
        public async Task enviarJugada(string idUsuarioDestino, string jugada)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("enviarJugadaResponse", jugada);
        }
        public async Task enviarResultadosJugada(string idUsuarioDestino, string idUsuarioGanador, string nombreUsuarioGanador)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("enviarResultadosJugadaResponse", idUsuarioGanador, nombreUsuarioGanador);
        }
        public async Task nuevaRonda(string idUsuarioDestino)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("nuevaRondaResponse");
        }

        public async Task ganadorRonda(string idUsuarioDestino)
        {
            await Clients.Group(idUsuarioDestino).SendAsync("ganadorResponse");
        }



    }
}
