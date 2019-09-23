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

        public async Task<int> CreateAccount(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<AccountModel>> GetAccounts(int customerId)
        {
            return await _eBankContext.Accounts
                                      .Where(a => a.CustomerId == customerId)
                                      .OrderBy(a => a.AccountType)
                                      .Select(a => new AccountModel {
                                              AccountNumber = a.AccountNumber,
                                              AccountType = a.AccountType,
                                              AccountStatus = a.AccountStatus,
                                              Balance = a.Balance,
                                              CustomerId = a.CustomerId})
                                      .ToListAsync();
        }        
    }
}
