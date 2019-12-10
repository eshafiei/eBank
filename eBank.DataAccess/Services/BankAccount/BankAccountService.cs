using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.Account
{
    public class BankAccountService : IBankAccountService
    {
        private const int MinimumBalanceAllowed = 100;
        private const int MaximumDepositAllowed = 10000;
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
                                       .FirstOrDefault(a => a.AccountId == accountId);
            if (account != null)
            {
                account.AccountStatus = false;
            }
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<int> DepositAsync(DepositModel deposit)
        {
            var account = _eBankContext.Accounts.FirstOrDefault(a => a.AccountId == deposit.AccountId);
            if (account != null)
            {
                if (deposit.Amount > MaximumDepositAllowed)
                {
                    return 0;
                }
                account.Balance += deposit.Amount;
                _eBankContext.Deposits.Add(deposit);
            }
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<int> WithdrawAsync(WithdrawModel withdraw)
        {
            var account = _eBankContext.Accounts.FirstOrDefault(a => a.AccountId == withdraw.AccountId);
            if (account != null)
            {
                if (CheckMinimumBalance(account.Balance, withdraw.Amount))
                {
                    return 0;
                }

                if (CheckMaximumWithdrawAllowed(account.Balance, withdraw.Amount))
                {
                    return 0;
                }

                account.Balance -= withdraw.Amount;
                _eBankContext.Withdraws.Add(withdraw);
            }
            return await _eBankContext.SaveChangesAsync();
        }

        private bool CheckMinimumBalance(double accountBalance, double withdrawAmount)
        {
            return accountBalance - withdrawAmount < MinimumBalanceAllowed;
        }

        private bool CheckMaximumWithdrawAllowed(double accountBalance, double withdrawAmount)
        {
            return withdrawAmount > (accountBalance * 0.9);
        }
    }
}
