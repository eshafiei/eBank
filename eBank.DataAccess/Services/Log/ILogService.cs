using eBank.DataAccess.Models.Logging;
using System.Threading.Tasks;

namespace eBank.DataAccess.Services.Log
{
    public interface ILogService
    {
        Task<int> AddLogAsync(LogHistoryModel log);
    }
}
