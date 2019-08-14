using eBank.DataAccess.Models.AccountManagement;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Models
{
    public class EBankContext : DbContext
    {
        public EBankContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
    }
}