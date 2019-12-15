using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Transaction;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Repository
{
    public class TransactionsRepository : ITransactionsRepository
    {
        private readonly EBankContext _eBankContext;

        public TransactionsRepository(EBankContext eBankContext)
        {
            _eBankContext = eBankContext;
        }

        public async Task<IEnumerable<TransactionModel>> GetTransactionsAsync(int accountId)
        {
            return await _eBankContext.Transactions.Where(t => t.AccountId == accountId)
                                                         .OrderByDescending(t => t.TransactionDate)
                                                         .ToListAsync();
        }

        public async Task<int> CreateTransactionAsync(TransactionModel transaction)
        {
            _eBankContext.Transactions.Add(transaction);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
