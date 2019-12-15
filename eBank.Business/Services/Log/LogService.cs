using Newtonsoft.Json;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Repository;

namespace eBank.Business.Services
{
    public class LogService : ILogService
    {
        private readonly ILogRepository _logRepository;

        public LogService(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        public async Task AddLog(LogModel logInfo)
        {
            var messageInfo = JsonConvert.DeserializeObject<MessageModel>(logInfo.Message);

            var logModel = new LogModel
            {
                Message = messageInfo.Message,
                Error = messageInfo.Error,
                FileName = logInfo.FileName,
                LogDate = logInfo.LogDate,
                LineNumber = logInfo.LineNumber,
                UserId = "1",
                Url = messageInfo.Url,
                Status = messageInfo.Status,
                StatusText = messageInfo.StatusText
            };

            await _logRepository.AddLogAsync(logModel);
        }
    }
}
