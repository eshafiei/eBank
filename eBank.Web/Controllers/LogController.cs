using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models.Logging;
using eBank.DataAccess.Objects.Logging;
using eBank.DataAccess.Services.Log;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task AddLog([FromBody] LogHistoryModel logInfo) {
            await _logService.AddLogAsync(logInfo);
        }
    }
}