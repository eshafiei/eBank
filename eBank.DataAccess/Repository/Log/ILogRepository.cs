using eBank.DataAccess.Models;
using System.Threading.Tasks;

namespace eBank.DataAccess.Repository
{
    public interface ILogRepository
    {
        Task<int> AddLogAsync(LogModel log);
    }
}
