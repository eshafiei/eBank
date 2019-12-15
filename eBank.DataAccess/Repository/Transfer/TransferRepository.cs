using System.Threading.Tasks;
using eBank.DataAccess.Models.Transfer;

namespace eBank.DataAccess.Repository
{
    public class TransferRepository : ITransferRepository
    {
        private readonly EBankContext _eBankContext;

        public TransferRepository(EBankContext eBankContext)
        {
            _eBankContext = eBankContext;
        }
        public async Task<int> CreateTransferAsync(TransferModel transfer)
        {
            _eBankContext.Transfers.Add(transfer);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
