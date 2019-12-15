using eBank.DataAccess.Models.Transaction;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.DataAccess.Repository
{
    public interface ITransactionsRepository
    {
        Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int accountId);

        Task<int> CreateTransactionAsync(TransactionModel transaction);
    }
}
