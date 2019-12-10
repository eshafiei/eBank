using Microsoft.EntityFrameworkCore.Migrations;

namespace eBank.DataAccess.Migrations
{
    public partial class updateswithdrawtablewithdrawdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DepositDate",
                table: "Withdraws",
                newName: "WithdrawDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WithdrawDate",
                table: "Withdraws",
                newName: "DepositDate");
        }
    }
}
