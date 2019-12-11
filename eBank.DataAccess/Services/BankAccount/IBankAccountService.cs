using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;

namespace eBank.DataAccess.Services.Account
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId);

        Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(string userId);

        Task<TransactionResult> CreateAccountAsync(AccountModel accountModel);

        Task<TransactionResult> DeleteAccountAsync(long accountId);

        Task<TransactionResult> DepositAsync(DepositModel deposit);

        Task<TransactionResult> WithdrawAsync(WithdrawModel withdraw);
    }
}
