using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transfer;
using eBank.DataAccess.Repository;

namespace eBank.Business.Services
{
    public class TransferService : ITransferService
    {
        private readonly ITransferRepository _transferRepository;
        private readonly IBankAccountRepository _bankAccountRepository;

        public TransferService(ITransferRepository transferRepository,
            IBankAccountRepository bankAccountRepository)
        {
            _transferRepository = transferRepository;
            _bankAccountRepository = bankAccountRepository;
        }

        public async Task<TransactionResult> TransferMoney(TransferModel transfer)
        {
            var originAccount = await _bankAccountRepository.GetAccountByIdAsync(transfer.OriginAccount);
            var destinationAccount = await _bankAccountRepository.GetAccountByIdAsync(transfer.DestinationAccount);

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

            var response = await _transferRepository.CreateTransferAsync(transfer);

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
