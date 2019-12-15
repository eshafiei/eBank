using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using eBank.DataAccess.Models;
using eBank.Business.Services;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private ILogService _logService;

        public LogController(ILogService logService) {
            _logService = logService;
        }

        [HttpPost("[action]")]
        public async Task AddLog([FromBody] LogModel logModel) {
            await _logService.AddLog(logModel);
        }
    }
}