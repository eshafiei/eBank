using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;

namespace eBank.DataAccess.Services.Transactions
{
    public interface ITransactionsService
    {
        Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int accountId);

        Task<TransactionResult> CreateTransactionAsync(TransactionModel transaction);
    }
}
