using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
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

        public async Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId)
        {
            var accounts = from a in _eBankContext.Accounts
                        join c in _eBankContext.Customers on a.CustomerId equals c.CustomerId
                        where c.UserId == userId && a.AccountStatus == true
                        orderby a.AccountType
                        select a;

            return await accounts.ToListAsync();                        
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(int customerId)
        {
            return await _eBankContext.Accounts
                                      .Where(a => a.CustomerId == customerId && a.AccountStatus == true)
                                      .ToListAsync();
        }

        public async Task<int> CreateAccountAsync(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<int> DeleteAccountAsync(long accountId)
        {
            var account = _eBankContext.Accounts
                                       .Where(a => a.AccountId == accountId)
                                       .FirstOrDefault();
            if (account != null)
            {
                account.AccountStatus = false;
            }
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
