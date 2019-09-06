using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.Account
{
    public class AccountService : IAccountService
    {
        readonly EBankContext _eBankContext;

        public AccountService(EBankContext context)
        {
            _eBankContext = context;
        }

        public async Task<int> CreateAccount(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<CustomerModel> GetCustomer(int customerId)
        {
            var customer = await _eBankContext.Customers.FirstOrDefaultAsync(c => c.CustomerId == customerId);

            if (customer == null) {
                return null;
            }

            return customer;
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

            //return await _eBankContext.Customers
            //               .Join(_eBankContext.Accounts,
            //                  customer => customer.CustomerId,
            //                  account => account.CustomerId,
            //                  (customer, account) =>
            //                  new AccountViewModel { Account = account, Customer = customer })
            //               .Where(customerAndAccounts => customerAndAccounts.Customer.CustomerId == customerId)
            //               .OrderBy(i => i.Account.AccountType)
            //               .ToListAsync();
        }        
    }
}
