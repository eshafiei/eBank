using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.Account
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId);

        Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(int customerId);

        Task<int> CreateAccountAsync(AccountModel accountModel);

        Task<int> DeleteAccountAsync(long accountId);
    }
}
