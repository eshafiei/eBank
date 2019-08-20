using Microsoft.EntityFrameworkCore.Migrations;

namespace eBank.DataAccess.Migrations
{
    public partial class updateslogstableadderrorcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Error",
                table: "Logs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Error",
                table: "Logs");
        }
    }
}
