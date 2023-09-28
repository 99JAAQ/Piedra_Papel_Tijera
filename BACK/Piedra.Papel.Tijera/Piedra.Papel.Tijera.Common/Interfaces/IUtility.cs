using Piedra.Papel.Tijera.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Piedra.Papel.Tijera.Common.Interfaces
{
    public interface IUtility
    {
        HashSalt EncryptPassword(string password);
        bool VerifyPassword(string enteredPassword, byte[] salt, string storedPassword);
    }
}
