using eBank.DataAccess.Objects.AccountManagement;
using eBank.DataAccess.Objects.Logging;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Models
{
    public class EBankContext : DbContext
    {
        public EBankContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<AccountDto> Accounts { get; set; }

        public DbSet<LogDto> Logs { get; set; }
    }
}