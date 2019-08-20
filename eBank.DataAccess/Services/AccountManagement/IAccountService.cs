using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Objects.AccountManagement;

namespace eBank.DataAccess.Services.AccountManagement
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountDto>> GetAccounts(long userId);

        Task<int> CreateAccount(AccountDto accountModel);
    }
}
