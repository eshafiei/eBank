using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.Account
{
    public class BankAccountService : IBankAccountService
    {
        readonly EBankContext _eBankContext;

        public BankAccountService(EBankContext context)
        {
            _eBankContext = context;
        }

        public async Task<AccountModel> GetAccountByIdAsync(int accountId)
        {
            return await _eBankContext.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId)
        {
            return await _eBankContext.Accounts
                                        .Where(a => a.Id == userId && a.AccountStatus == true)
                                        .OrderBy(a => a.AccountType)
                                        .ToListAsync();
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(string userId)
        {
            return await _eBankContext.Accounts
                                      .Where(a => a.Id == userId && a.AccountStatus == true)
                                      .ToListAsync();
        }

        public async Task<TransactionResult> CreateAccountAsync(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = "account created successfully.",
                    Status = TransactionStatus.Success
                };
            }

            return new TransactionResult
            {
                Result = "Internal server error.",
                Status = TransactionStatus.Error
            };
        }

        public async Task<TransactionResult> DeleteAccountAsync(long accountId)
        {
            var account = _eBankContext.Accounts
                                       .FirstOrDefault(a => a.AccountId == accountId);
            if (account == null)
            {
                return new TransactionResult
                {
                    Result = "Account not found.",
                    Status = TransactionStatus.ValidationError
                };
            }

            if (account.Balance > 0)
            {
                return new TransactionResult
                {
                    Result = $"Accounts has ${account.Balance}. Please transfer the account balance first.",
                    Status = TransactionStatus.ValidationError
                };
            }

            account.AccountStatus = false;
            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = "account closed successfully.",
                    Status = TransactionStatus.Success
                };
            }

            return new TransactionResult
            {
                Result = "Internal server error.",
                Status = TransactionStatus.Error
            };
        }
    }
}
