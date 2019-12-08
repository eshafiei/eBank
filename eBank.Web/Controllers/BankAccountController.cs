using eBank.DataAccess.Models;
using eBank.DataAccess.Services.Account;
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

        [HttpGet("{userId}")]
        public async Task<IEnumerable<AccountModel>> BankAccount(string userId)
        {
            return await _accountService.GetAccountsAsync(userId);
        }

        [HttpGet("[action]/{customerId}")]
        public async Task<IEnumerable<AccountModel>> GetAccountsDropDown(int customerId)
        {
            return await _accountService.GetAccountsDropDownAsync(customerId);
        }

        [HttpPost]
        public async Task<int> BankAccount([FromBody] AccountModel account)
        {
            return await _accountService.CreateAccountAsync(account);
        }

        [HttpDelete("{accountId}")]
        public async Task<int> BankAccount(long accountId)
        {
            return await _accountService.DeleteAccountAsync(accountId);
        }
    }
}