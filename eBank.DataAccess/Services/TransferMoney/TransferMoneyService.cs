using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.TransferMoney
{
    public class TransferMoneyService : ITransferMoneyService
    {
        readonly EBankContext _eBankContext;

        public TransferMoneyService(EBankContext context)
        {
            _eBankContext = context;
        }

        public async Task<IEnumerable<AccountModel>> GetAccountsDropDownAsync(int customerId)
        {
            return await _eBankContext.Accounts
                                      .Where(a => a.CustomerId == customerId)
                                      .ToListAsync();
        }
    }
}
