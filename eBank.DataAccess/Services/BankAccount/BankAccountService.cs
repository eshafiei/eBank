﻿using System.Collections.Generic;
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
                        where c.UserId == userId
                        orderby a.AccountType
                        select a;

            return await accounts.ToListAsync();                        
        }

        public async Task<int> CreateAccountAsync(AccountModel account)
        {
            _eBankContext.Accounts.Add(account);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
