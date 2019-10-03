using eBank.DataAccess.Models;
using eBank.DataAccess.Services.Account;
using eBank.DataAccess.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BankAccountController : ControllerBase
    {
        private IBankAccountService _accountService;

        public BankAccountController(IBankAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("[action]/{userId}")]
        public async Task<IEnumerable<AccountViewModel>> GetAccounts(string userId)
        {
            return await _accountService.GetAccountsAsync(userId);
        }

        [HttpPost("[action]")]
        public async Task<int> CreateAccount([FromBody] AccountModel account)
        {
            return await _accountService.CreateAccount(account);
        }
    }
}