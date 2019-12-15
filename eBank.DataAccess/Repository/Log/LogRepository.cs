using System;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Repository
{
    public class LogRepository : ILogRepository
    {
        readonly EBankContext _eBankContext;

        public LogRepository(EBankContext eBankContext)
        {
            _eBankContext = eBankContext;
        }

        public async Task<int> AddLogAsync(LogModel log)
        {
            _eBankContext.Logs.Add(log);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
