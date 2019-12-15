using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Repository
{
    public class BankAccountRepository : IBankAccountRepository
    {
        private readonly EBankContext _eBankContext;

        public BankAccountRepository(EBankContext eBankContext)
        {
            _eBankContext = eBankContext;
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

        public async Task<int> CreateAccountAsync(AccountModel accountModel)
        {
            _eBankContext.Accounts.Add(accountModel);
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<int> DeleteAccountAsync(long accountId)
        {
            var account = _eBankContext.Accounts
                         .FirstOrDefault(a => a.AccountId == accountId);
            account.AccountStatus = false;

            return await _eBankContext.SaveChangesAsync();
        }        
    }
}
