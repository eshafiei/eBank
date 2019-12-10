using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;
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

        public async Task<TransactionResult> TransferMoneyAsync(TransferModel transfer)
        {
            var originAccount = _eBankContext.Accounts
                                             .FirstOrDefault(a => a.AccountId == transfer.OriginAccount);
            var destinationAccount = _eBankContext.Accounts
                                                  .FirstOrDefault(a => a.AccountId == transfer.DestinationAccount);
            if (originAccount == null || destinationAccount == null)
            {
                return null;
            }

            if (transfer.Amount > originAccount.Balance)
            {
                return new TransactionResult
                {
                    Result = "Insufficient funds! Please adjust the amount and try again.",
                    Status = TransactionStatus.ValidationError
                };
            }

            originAccount.Balance -= transfer.Amount;
            destinationAccount.Balance += transfer.Amount;
            _eBankContext.Transfers.Add(transfer);

            var response = await _eBankContext.SaveChangesAsync();

            if (response > 0)
            {
                return new TransactionResult
                {
                    Result = "Transfer completed successfully.",
                    Status = TransactionStatus.Success
                };
            }

            return new TransactionResult
            {
                Result = "Internal server error.",
                Status = TransactionStatus.Error
            };
        }
    }
}
