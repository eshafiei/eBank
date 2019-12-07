using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Transfer;
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

        public async Task<int> TransferMoneyAsync(TransferModel transfer)
        {
            var originAccount = _eBankContext.Accounts
                                             .Where(a => a.AccountId == transfer.OriginAccount)
                                             .FirstOrDefault();
            if (originAccount != null)
            {
                originAccount.Balance -= transfer.Amount;
            }

            var destinationAccount = _eBankContext.Accounts
                                             .Where(a => a.AccountId == transfer.DestinationAccount)
                                             .FirstOrDefault();
            if (destinationAccount != null)
            {
                destinationAccount.Balance += transfer.Amount;
            }

            _eBankContext.Transfers.Add(transfer);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
