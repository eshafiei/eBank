using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Transfer;
using eBank.DataAccess.Services.TransferMoney;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TransferMoneyController : ControllerBase
    {
        private ITransferMoneyService _transferMoneyService;

        public TransferMoneyController(ITransferMoneyService transferMoneyService)
        {
            _transferMoneyService = transferMoneyService;
        }

        [HttpPost]
        public async Task<int> TransferMoney([FromBody] TransferModel transfer)
        {
            return await _transferMoneyService.TransferMoneyAsync(transfer);
        }
    }
}