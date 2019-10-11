using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.ViewModels;
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

        public async Task<int> CreateAccount(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsAsync(int customerId)
        {
            return await _eBankContext.Accounts
                                      .Where(account => account.CustomerId == customerId)
                                      .OrderBy(account => account.AccountType)
                                      .ToListAsync();
        }
    }
}
