using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.ViewModels;

namespace eBank.DataAccess.Services.Account
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccounts(int customerId);

        Task<int> CreateAccount(AccountViewModel accountViewModel);
    }
}
