using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Account;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
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

        [HttpGet("[action]/{userId}")]
        public async Task<IEnumerable<AccountModel>> GetAccountsDropDown(string userId)
        {
            return await _accountService.GetAccountsDropDownAsync(userId);
        }

        [HttpPost]
        public async Task<IActionResult> BankAccount([FromBody] AccountModel account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var response = await _accountService.CreateAccountAsync(account);

            return HandleResponse(response);
        }

        [HttpDelete("{accountId}")]
        public async Task<IActionResult> BankAccount(long accountId)
        {
            var response = await _accountService.DeleteAccountAsync(accountId);

            return HandleResponse(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Deposit([FromBody] DepositModel deposit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var response = await _accountService.DepositAsync(deposit);

            return HandleResponse(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawModel withdraw)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var response = await _accountService.WithdrawAsync(withdraw);

            return HandleResponse(response);
        }

        private IActionResult HandleResponse(TransactionResult response)
        {
            if (response == null)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable);
            }

            switch (response.Status)
            {
                case TransactionStatus.Success:
                    return Ok(new ApiOkResponse(response.Result));
                case TransactionStatus.Error:
                    return StatusCode(StatusCodes.Status500InternalServerError);
                case TransactionStatus.ValidationError:
                    return StatusCode(StatusCodes.Status403Forbidden, response.Result);
                default:
                    return StatusCode(StatusCodes.Status503ServiceUnavailable);
            }
        }
    }
}