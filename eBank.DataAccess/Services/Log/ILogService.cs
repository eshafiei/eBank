using eBank.DataAccess.Models;
using System.Threading.Tasks;

namespace eBank.DataAccess.Services.Log
{
    public interface ILogService
    {
        Task<int> AddLogAsync(LogModel log);
    }
}
