using eBank.DataAccess.Objects.AccountManagement;
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

        [HttpGet("[action]/{userId}")]
        public async Task<IEnumerable<AccountDto>> GetAccounts(long userId)
        {
            return await _accountService.GetAccounts(userId);
        }

        [HttpPost("[action]")]
        public async Task<int> CreateAccount([FromBody] AccountDto account)
        {
            return await _accountService.CreateAccount(account);
        }
    }
}