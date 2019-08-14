using eBank.DataAccess.Models;
using eBank.DataAccess.Models.AccountManagement;
using Microsoft.AspNetCore.Mvc;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        readonly EBankContext _eBankContext;

        public AccountController(EBankContext context) {
            _eBankContext = context;
        }

        [HttpPost("[action]")]
        public bool CreateAccount([FromBody] Account account)
        {
            _eBankContext.Accounts.Add(account);
            _eBankContext.SaveChanges();
            return true;
        }
    }
}