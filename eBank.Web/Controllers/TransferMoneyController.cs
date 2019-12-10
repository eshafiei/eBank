using System.Collections.Generic;
using System.Threading.Tasks;
using eBank.DataAccess.Enums;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Base;
using eBank.DataAccess.Models.Transfer;
using eBank.DataAccess.Services.TransferMoney;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> TransferMoney([FromBody] TransferModel transfer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var response = await _transferMoneyService.TransferMoneyAsync(transfer);

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