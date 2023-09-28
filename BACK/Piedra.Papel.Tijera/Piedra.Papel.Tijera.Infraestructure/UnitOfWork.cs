

using Piedra.Papel.Tijera.Infraestructure;
using Piedra.Papel.Tijera.Infraestructure.Interfaces;
using Piedra.Papel.Tijera.Infraestructure.Models;

namespace Piedra.Papel.TijeraInfraestructure
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private readonly DataBaseContext _context;

        public UnitOfWork(DataBaseContext context)
        {
            this._context = context;
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public void SaveAsync()
        {
            _context.SaveChangesAsync();
        }

        private bool disposed = false;

        private Repository<Player> _Player;
        private Repository<Round> _Round;

        public Repository<Player> Player => _Player ??= new Repository<Player>(_context);
        public Repository<Round> Round => _Round ??= new Repository<Round>(_context);

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}