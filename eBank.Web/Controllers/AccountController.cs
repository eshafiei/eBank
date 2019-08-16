using eBank.DataAccess.Models.AccountManagement;
using eBank.DataAccess.Services.AccountManagement;
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

        [HttpGet("[action]/{accountNumber}")]
        public async Task<IEnumerable<Account>> GetAccounts(long accountNumber)
        {
            return await _accountService.GetAccounts(accountNumber);
        }

        [HttpPost("[action]")]
        public async Task<int> CreateAccount([FromBody] Account account)
        {
            return await _accountService.CreateAccount(account);
        }
    }
}