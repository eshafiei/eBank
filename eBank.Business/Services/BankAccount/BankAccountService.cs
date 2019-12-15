using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Repository;

namespace eBank.Business.Services
{
    public class BankAccountService : IBankAccountService
    {
        private readonly IBankAccountRepository _bankAccountRepository;

        public BankAccountService(IBankAccountRepository bankAccountRepository)
        {
            _bankAccountRepository = bankAccountRepository;
        }

        public async Task<AccountModel> GetAccountById(int accountId)
        {
            return await _bankAccountRepository.GetAccountByIdAsync(accountId);
        }

        public async Task<IEnumerable<AccountModel>> GetAccounts(string userId)
        {
            var accounts = await _bankAccountRepository.GetAccountsAsync(userId);

            accounts.ToList().ForEach(a => {
                a.MaskedAccountNumber = Regex.Replace(a.AccountNumber.ToString(), "[0-9](?=[0-9]{4})", "*");
            });

            return accounts;
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsDropDown(string userId)
        {
            return await _bankAccountRepository.GetAccountsDropDownAsync(userId);
        }

        public async Task<TransactionResult> CreateAccount(AccountModel account)
        {
            var response = await _bankAccountRepository.CreateAccountAsync(account);

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

        public async Task<TransactionResult> DeleteAccount(int accountId)
        {
            var account = await _bankAccountRepository.GetAccountByIdAsync(accountId);
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

            var response = await _bankAccountRepository.DeleteAccountAsync(accountId);

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
    }
}
