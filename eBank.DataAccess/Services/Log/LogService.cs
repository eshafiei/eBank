using Newtonsoft.Json;
using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.Log
{
    public class LogService : ILogService
    {
        readonly EBankContext _eBankContext;

        public LogService(EBankContext eBankContext) {
            _eBankContext = eBankContext;
        }

        public async Task<int> AddLogAsync(LogModel logInfo)
        {
            var messageInfo = JsonConvert.DeserializeObject<MessageModel>(logInfo.Message);

            var logModel = new LogModel {
                Message = messageInfo.Message,
                Error = messageInfo.Error,
                FileName = logInfo.FileName,
                LogDate = logInfo.LogDate,
                LineNumber = logInfo.LineNumber,
                UserId = 1,
                Url = messageInfo.Url,
                Status = messageInfo.Status,
                StatusText = messageInfo.StatusText
            };
            _eBankContext.Logs.Add(logModel);
            return await _eBankContext.SaveChangesAsync();
        }
    }
}
