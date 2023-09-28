using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Infraestructure.Models
{
    [Table("Player")]
    public class Player
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string FullName { get; set; }

        [Required,MinLength(7)]
        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
