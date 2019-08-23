﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Migrations
{
    [DbContext(typeof(EBankContext))]
    [Migration("20190819235127_adds-logs-table")]
    partial class addslogstable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("eBank.DataAccess.Models.AccountManagement.Account", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("AccountNumber");

                    b.Property<bool>("AccountStatus");

                    b.Property<int>("AccountType");

                    b.Property<decimal>("Balance");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("eBank.DataAccess.Models.Logging.Log", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ErrorMessage");

                    b.Property<DateTime>("LogDate");

                    b.Property<int>("Status");

                    b.Property<string>("StatusText");

                    b.Property<string>("Url");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Logs");
                });
#pragma warning restore 612, 618
        }
    }
}