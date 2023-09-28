using Piedra.Papel.Tijera.Infraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Infraestructure.Interfaces
{
    public interface IUnitOfWork
    {
        Repository<Player> Player { get; }
        Repository<Round> Round { get; }
        void Dispose();

        int Save();

        void SaveAsync();
    }
}
