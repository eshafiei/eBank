using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Transfer;

namespace eBank.DataAccess.Services.TransferMoney
{
    public interface ITransferMoneyService
    {
        Task<int> TransferMoneyAsync(TransferModel transfer);
    }
}
