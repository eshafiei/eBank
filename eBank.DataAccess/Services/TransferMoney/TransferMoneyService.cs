using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Transfer;

namespace eBank.DataAccess.Services.TransferMoney
{
    public class TransferMoneyService : ITransferMoneyService
    {
        readonly EBankContext _eBankContext;

        public TransferMoneyService(EBankContext context)
        {
            _eBankContext = context;
        }

        public async Task<int> TransferMoneyAsync(TransferModel transfer)
        {
            var originAccount = _eBankContext.Accounts
                                             .FirstOrDefault(a => a.AccountId == transfer.OriginAccount);
            if (originAccount != null)
            {
                originAccount.Balance -= transfer.Amount;
            }

            var destinationAccount = _eBankContext.Accounts
                                                  .FirstOrDefault(a => a.AccountId == transfer.DestinationAccount);
            if (destinationAccount != null)
            {
                destinationAccount.Balance += transfer.Amount;
            }

            _eBankContext.Transfers.Add(transfer);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
