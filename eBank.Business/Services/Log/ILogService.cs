using eBank.DataAccess.Models;
using System.Threading.Tasks;

namespace eBank.Business.Services
{
    public interface ILogService
    {
        Task AddLog(LogModel log);
    }
}
