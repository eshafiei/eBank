using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.ViewModels;

namespace eBank.DataAccess.Services.Account
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountViewModel>> GetAccountsAsync(string userId);        

        Task<int> CreateAccount(AccountModel accountModel);
    }
}
