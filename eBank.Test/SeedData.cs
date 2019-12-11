using eBank.DataAccess;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBank.Test
{
    public static class SeedData
    {
        public static void PopulateTestData(EBankContext dbContext)
        {
            // Add Customer
            dbContext.Customers.Add(new CustomerModel
            {
                FirstName = "Ehsan",
                LastName = "Shafiei",
                DateOfBirth = new DateTime(1985, 2, 2),
                LegalStatus = (int)LegalStatus.Citizen,
                UserId = "ec9426bc-fb05-4a38-b63b-f265cbdfb816"
            });

            // Add bank accounts for the customer
            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 1234567890,
                AccountType = (int)AccountType.Checking,
                Balance = 10000,
                AccountStatus = true,
                CustomerId = 1
            });

            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 8527419632,
                AccountType = (int)AccountType.JointChecking,
                Balance = 500,
                AccountStatus = true,
                CustomerId = 1
            });

            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 8541239537,
                AccountType = (int)AccountType.Saving,
                Balance = 20000,
                AccountStatus = false,
                CustomerId = 1
            });

            dbContext.SaveChanges();
        }
    }
}
