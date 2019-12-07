﻿using Microsoft.EntityFrameworkCore;
using eBank.DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using eBank.DataAccess.Models.Transfer;

namespace eBank.DataAccess
{
    public class EBankContext : IdentityDbContext<IdentityUser>
    {
        public EBankContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<AccountModel> Accounts { get; set; }

        public DbSet<CustomerModel> Customers { get; set; }

        public DbSet<AddressModel> Address { get; set; }

        public DbSet<LogModel> Logs { get; set; }

        public DbSet<TransferModel> Transfers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AccountModel>()
                .Property(b => b.Balance)
                .HasDefaultValue(decimal.Zero);
        }
    }
}