using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models.AccountManagement;

namespace eBank.DataAccess.Services.AccountManagement
{
    public interface IAccountService
    {
        Task<IEnumerable<Account>> GetAccounts(long userId);

        Task<int> CreateAccount(Account accountModel);
    }
}
