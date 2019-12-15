using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.Business.Services
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccounts(string userId);

        Task<AccountModel> GetAccountById(int accountId);
        
        Task<IEnumerable<AccountModel>> GetAccountsDropDown(string userId);

        Task<TransactionResult> CreateAccount(AccountModel accountModel);

        Task<TransactionResult> DeleteAccount(int accountId);
    }
}
