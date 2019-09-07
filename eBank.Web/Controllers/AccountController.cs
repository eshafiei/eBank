using eBank.DataAccess.Models;
using eBank.DataAccess.Services.Account;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("[action]/{customerId}")]
        public async Task<IEnumerable<AccountModel>> GetAccounts(int customerId)
        {
            return await _accountService.GetAccounts(customerId);
        }

        [HttpPost("[action]")]
        public async Task<int> CreateAccount([FromBody] AccountModel account)
        {
            return await _accountService.CreateAccount(account);
        }
    }
}