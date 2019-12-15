using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.Business.Services;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;
using eBank.DataAccess.Repository;

namespace eBank.DataAccess.Services.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private const int MinimumBalanceAllowed = 100;
        private const int MaximumDepositAllowed = 10000;
        private readonly ITransactionsRepository _transactionsRepository;
        private readonly IBankAccountRepository _bankAccountRepository;

        public TransactionsService(ITransactionsRepository transactionsRepository,
            IBankAccountRepository bankAccountRepository)
        {
            _transactionsRepository = transactionsRepository;
            _bankAccountRepository = bankAccountRepository;
        }

        public async Task<IEnumerable<TransactionModel>> GetTransactions(int accountId)
        {
            var transactions = await _transactionsRepository.GetTransactionsAsync(accountId);

            if (transactions == null)
            {
                return null;
            }

            return transactions;
        }

        public async Task<TransactionResult> CreateTransaction(TransactionModel transaction)
        {
            var account = await _bankAccountRepository.GetAccountByIdAsync(transaction.AccountId);

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

            var response = await _transactionsRepository.CreateTransactionAsync(transaction);

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
