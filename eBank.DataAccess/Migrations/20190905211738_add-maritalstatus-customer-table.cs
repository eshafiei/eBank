using Microsoft.EntityFrameworkCore.Migrations;

namespace eBank.DataAccess.Migrations
{
    public partial class addmaritalstatuscustomertable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaritalStatus",
                table: "Customers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "Customers");
        }
    }
}
