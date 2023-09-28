using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Infraestructure.Models
{
    [Table("Round")]
    public class Round
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid Player1Id { get; set; }
        [Required]
        public Guid Player2Id { get; set; }
        public Guid WinnerId { get; set; }

    }
}
