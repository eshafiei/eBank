using eBank.DataAccess.Models.Account;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.DataAccess.Repository
{
    public interface IBankAccountRepository
    {
        Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId);

        Task<AccountModel> GetAccountByIdAsync(int accountId);

        Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(string userId);

        Task<int> CreateAccountAsync(AccountModel accountModel);

        Task<int> DeleteAccountAsync(long accountId);
    }
}
