namespace Piedra.Papel.Tijera.Common.Dto
{
    public class JwtSetting
    {
        public string? Issuer { get; set; }

        public string? Audience { get; set; }

        public string? Key { get; set; }

        public int ExpirationMinutes { get; set; }

        public int RefreshTokenTTL { get; set; }
    }
}