using Microsoft.EntityFrameworkCore.Migrations;

namespace eBank.DataAccess.Migrations
{
    public partial class updateslogstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ErrorMessage",
                table: "Logs",
                newName: "Message");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Logs",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LineNumber",
                table: "Logs",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Logs");

            migrationBuilder.DropColumn(
                name: "LineNumber",
                table: "Logs");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Logs",
                newName: "ErrorMessage");
        }
    }
}
