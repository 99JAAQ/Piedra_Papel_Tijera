using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Piedra.Papel.Tijera.Infraestructure.Migrations
{
    /// <inheritdoc />
    public partial class update_table_player : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Player",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Player");
        }
    }
}
