using Microsoft.EntityFrameworkCore;
using eBank.DataAccess.Objects;

namespace eBank.DataAccess
{
    public class EBankContext : DbContext
    {
        public EBankContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<UserDto> Users { get; set; }

        public DbSet<AccountDto> Accounts { get; set; }

        public DbSet<CustomerDto> Customers { get; set; }

        public DbSet<LogDto> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountDto>()
                .Property(b => b.Balance)
                .HasDefaultValue(decimal.Zero);
        }
    }
}