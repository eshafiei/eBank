using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.Account
{
    public interface IBankAccountService
    {
        Task<IEnumerable<AccountModel>> GetAccounts(int customerId);

        Task<int> CreateAccount(AccountModel accountModel);
    }
}
