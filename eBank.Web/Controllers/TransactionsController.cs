using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.Business.Services;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transaction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private ITransactionsService _transactionsService;

        public TransactionsController(ITransactionsService transactionsService)
        {
            _transactionsService = transactionsService;
        }

        [HttpGet("{accountId}")]
        public async Task<IEnumerable<TransactionModel>> Transactions(int accountId)
        {
            return await _transactionsService.GetTransactions(accountId);
        }

        [HttpPost]
        public async Task<IActionResult> Transactions([FromBody] TransactionModel transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var response = await _transactionsService.CreateTransaction(transaction);

            return HandleResponse(response);
        }

        private IActionResult HandleResponse(TransactionResult response)
        {
            if (response == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
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