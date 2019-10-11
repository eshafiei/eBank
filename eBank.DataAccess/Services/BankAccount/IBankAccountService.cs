using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.Account
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccountsAsync(string userId);        

        Task<int> CreateAccountAsync(AccountModel accountModel);
    }
}
