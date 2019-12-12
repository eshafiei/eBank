using eBank.DataAccess;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Account;

namespace eBank.Test
{
    public static class SeedData
    {
        public static void PopulateTestData(EBankContext dbContext)
        {
            // Add bank accounts for the customer
            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 1234567890,
                AccountType = (int)AccountType.Checking,
                Balance = 10000,
                AccountStatus = true,
                Id = "6a25acf9-b7e0-4c61-b532-21fde9c7409f"
            });

            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 8527419632,
                AccountType = (int)AccountType.JointChecking,
                Balance = 500,
                AccountStatus = true,
                Id = "6a25acf9-b7e0-4c61-b532-21fde9c7409f"
            });

            dbContext.Accounts.Add(new AccountModel
            {
                AccountNumber = 8541239537,
                AccountType = (int)AccountType.Saving,
                Balance = 20000,
                AccountStatus = false,
                Id = "6a25acf9-b7e0-4c61-b532-21fde9c7409f"
            });

            dbContext.SaveChanges();
        }
    }
}
