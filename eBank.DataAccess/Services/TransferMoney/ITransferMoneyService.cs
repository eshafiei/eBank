using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.TransferMoney
{
    public interface ITransferMoneyService
    {
        Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(int customerId);
    }
}
