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

        public async Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(string userId)
        {
            var customer = _eBankContext.Customers.FirstOrDefault(c => c.UserId == userId);
            if (customer == null)
            {
                return null;
            }

            return await _eBankContext.Accounts
                                      .Where(a => a.CustomerId == customer.CustomerId && a.AccountStatus == true)
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

        public async Task<TransactionResult> DepositAsync(DepositModel deposit)
        {
            var account = _eBankContext.Accounts.FirstOrDefault(a => a.AccountId == deposit.AccountId);

            if (account == null)
            {
                return new TransactionResult
                {
                    Result = "Account not found.",
                    Status = TransactionStatus.ValidationError
                };
            }

            if (deposit.Amount > MaximumDepositAllowed)
            {
                return new TransactionResult
                {
                    Result = "Amount reached maximum deposit amount allowed.",
                    Status = TransactionStatus.ValidationError
                };
            }

            account.Balance += deposit.Amount;
            _eBankContext.Deposits.Add(deposit);
            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = "Deposit completed successfully.",
                    Status = TransactionStatus.Success
                };
            }

            return new TransactionResult
            {
                Result = "Internal server error.",
                Status = TransactionStatus.Error
            };
        }

        public async Task<TransactionResult> WithdrawAsync(WithdrawModel withdraw)
        {
            var account = _eBankContext.Accounts.FirstOrDefault(a => a.AccountId == withdraw.AccountId);
            if (account == null)
            {
                return new TransactionResult
                {
                    Result = "Account not found.",
                    Status = TransactionStatus.ValidationError
                };
            }

            if (CheckMinimumBalance(account.Balance, withdraw.Amount))
            {
                return new TransactionResult
                {
                    Result = $"Withdraw failed. Account balance cannot go below ${MinimumBalanceAllowed}.",
                    Status = TransactionStatus.ValidationError
                };
            }

            if (CheckMaximumWithdrawAllowed(account.Balance, withdraw.Amount))
            {
                return new TransactionResult
                {
                    Result = "Withdraw failed. Maximum withdraw allowance reached.",
                    Status = TransactionStatus.ValidationError
                };
            }

            account.Balance -= withdraw.Amount;
            _eBankContext.Withdraws.Add(withdraw);
            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = "Withdraw completed successfully.",
                    Status = TransactionStatus.Success
                };
            }

            return new TransactionResult
            {
                Result = "Internal server error.",
                Status = TransactionStatus.Error
            };
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
