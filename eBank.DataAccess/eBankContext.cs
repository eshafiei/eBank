using Microsoft.EntityFrameworkCore;
using eBank.DataAccess.Models;

namespace eBank.DataAccess
{
    public class EBankContext : DbContext
    {
        public EBankContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }

        public DbSet<AccountModel> Accounts { get; set; }

        public DbSet<CustomerModel> Customers { get; set; }

        public DbSet<AddressModel> Address { get; set; }

        public DbSet<LogModel> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountModel>()
                .Property(b => b.Balance)
                .HasDefaultValue(decimal.Zero);
        }
    }
}