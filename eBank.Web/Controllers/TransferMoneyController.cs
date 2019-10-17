using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
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

        [HttpGet("[action]/{customerId}")]
        public async Task<IEnumerable<AccountModel>> GetAccountsDropDown(int customerId)
        {
            return await _transferMoneyService.GetAccountsDropDownAsync(customerId);
        }
    }
}