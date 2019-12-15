using eBank.DataAccess.Models.Transfer;
using System.Threading.Tasks;

namespace eBank.DataAccess.Repository
{
    public interface ITransferRepository
    {
        Task<int> CreateTransferAsync(TransferModel transfer);
    }
}
