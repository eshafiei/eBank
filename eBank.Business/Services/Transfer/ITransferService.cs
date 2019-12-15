using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transfer;

namespace eBank.Business.Services
{
    public interface ITransferService
    {
        Task<TransactionResult> TransferMoney(TransferModel transfer);
    }
}
