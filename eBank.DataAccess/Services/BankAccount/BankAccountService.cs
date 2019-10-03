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

        public async Task<IEnumerable<AccountViewModel>> GetAccountsAsync(string userId)
        {
            return await _eBankContext.Accounts
                                      .Join(_eBankContext.Customers,
                                        account => account.CustomerId,
                                        customer => customer.CustomerId,
                                        (account, customer) =>
                                            new AccountViewModel
                                            {
                                                Account = account,
                                                Customer = customer
                                            })
                                      .Where(accountAndCustomer => accountAndCustomer.Customer.UserId == userId)
                                      .OrderBy(accountAndCustomer => accountAndCustomer.Account.AccountType)
                                      .ToListAsync();
        }
    }
}
