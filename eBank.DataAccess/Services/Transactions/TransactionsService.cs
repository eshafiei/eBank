using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private const int MinimumBalanceAllowed = 100;
        private const int MaximumDepositAllowed = 10000;
        readonly EBankContext _eBankContext;

        public TransactionsService(EBankContext context)
        {
            _eBankContext = context;
        }

        public async Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int accountId)
        {
            var transactions = _eBankContext.Transactions.Where(t => t.AccountId == accountId)
                                                         .OrderByDescending(t => t.TransactionDate);

            if (transactions == null)
            {
                return null;
            }

            return await transactions.ToListAsync();
        }

        public async Task<TransactionResult> CreateTransactionAsync(TransactionModel transaction)
        {
            var account = _eBankContext.Accounts.FirstOrDefault(a => a.AccountId == transaction.AccountId);

            if (account == null)
            {
                return new TransactionResult
                {
                    Result = "Account not found.",
                    Status = TransactionStatus.ValidationError
                };
            }

            if (transaction.TransactionType == TransactionType.Deposit)
            {
                if (transaction.Amount > MaximumDepositAllowed)
                {
                    return new TransactionResult
                    {
                        Result = "Amount reached maximum deposit amount allowed.",
                        Status = TransactionStatus.ValidationError
                    };
                }

                account.Balance += transaction.Amount;
            }

            if (transaction.TransactionType == TransactionType.Withdraw)
            {
                if (CheckMinimumBalance(account.Balance, transaction.Amount))
                {
                    return new TransactionResult
                    {
                        Result = $"Withdraw failed. Account balance cannot go below ${MinimumBalanceAllowed}.",
                        Status = TransactionStatus.ValidationError
                    };
                }

                if (CheckMaximumWithdrawAllowed(account.Balance, transaction.Amount))
                {
                    return new TransactionResult
                    {
                        Result = "Withdraw failed. Maximum withdraw allowance reached.",
                        Status = TransactionStatus.ValidationError
                    };
                }

                account.Balance -= transaction.Amount;
            }

            _eBankContext.Transactions.Add(transaction);
            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = $"{Enum.GetName(typeof(TransactionType), transaction.TransactionType)} completed successfully.",
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
