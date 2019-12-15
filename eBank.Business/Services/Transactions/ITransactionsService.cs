using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;

namespace eBank.Business.Services
{
    public interface ITransactionsService
    {
        Task<IEnumerable<TransactionModel>> GetTransactions(int accountId);

        Task<TransactionResult> CreateTransaction(TransactionModel transaction);
    }
}
