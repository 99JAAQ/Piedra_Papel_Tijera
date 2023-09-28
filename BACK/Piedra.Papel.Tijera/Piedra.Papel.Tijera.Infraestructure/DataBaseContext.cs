using Microsoft.EntityFrameworkCore;
using Piedra.Papel.Tijera.Infraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Infraestructure
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Round> Round { get; set; }
    }
}
